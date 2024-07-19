import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebase-config'; // Adjust with your actual firebase config import
import { doc, getDoc } from 'firebase/firestore';
import ingredients from './ingredients';

function OrderPricing() {
    const location = useLocation();
    const [recipeData, setRecipeData] = useState(null);
    const [targetGrams, setTargetGrams] = useState(60);
    const [ingredientList, setIngredientList] = useState([]);
    const [ingredientsText, setIngredientsText] = useState('');


    const totalGrams = ingredientList.reduce((sum, ingredient) => sum + ingredient.grams, 0);
    const totalCost = ingredientList.reduce((sum, ingredient) => sum + ingredient.cost, 0);
    const totalParts = Object.values(recipeData?.ingredients || {}).reduce((sum, part) => sum + part, 0);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const fetchData = async () => {
            const docRef = doc(db, "formulations", searchParams.get('recipeId'));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setRecipeData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        if (searchParams.get('recipeId')) {
            fetchData();
        }
    }, [location.search]);

    useEffect(() => {
        if (recipeData && totalParts > 0) {
            const ingredientsText = Object.entries(recipeData.ingredients)
                .sort((a, b) => b[1] - a[1])
                .map(([name, parts]) => {
                    const percentage = ((parts / totalParts) * 100); // Keeping 3 decimal places
                    return `${name} (${percentage.toFixed(2)}%)`;
                })
                .join(', ');
            
            setIngredientsText(`Base Recipe Ingredients: ${ingredientsText}`);
        }
    }, [recipeData, totalParts]);
    


    const calculateIngredients = useCallback(() => {
        if (recipeData) {
            const totalParts = Object.values(recipeData.ingredients).reduce((sum, part) => sum + part, 0);
            const newIngredientList = Object.entries(recipeData.ingredients).map(([name, parts]) => {
                const ingredientGrams = (targetGrams / totalParts) * parts;
                const ingredientCost = ingredients[name].cost_per_g ? ingredients[name].cost_per_g * ingredientGrams : "N/A";
                return { name, parts: parts, grams: ingredientGrams, cost: ingredientCost, type: ingredients[name].type };
            });
            setIngredientList(newIngredientList);
        }
    }, [recipeData, targetGrams]);

    useEffect(() => {
        if (recipeData && targetGrams > 0) {
            calculateIngredients();
        }
    }, [recipeData, targetGrams, calculateIngredients]);


    return (
        <div className="order-pricing">
            <h1>Order Pricing</h1>
            <input
                type="number"
                value={targetGrams}
                onChange={(e) => setTargetGrams(e.target.value)}
                placeholder="Target Grams"
            />
            <table>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Type</th>
                        <th>Parts</th>
                        <th>Grams</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredientList.sort((a, b) => a.type.localeCompare(b.type) )
                    .map((ingredient, index) => (
                        <tr key={index}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.type}</td>
                            <td>{ingredient.parts}</td>
                            <td>{ingredient.grams.toFixed(3)}</td>
                            <td>${typeof(ingredient.cost) === "number" ? ingredient.cost.toFixed(2) : "NaN"}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td>{totalParts}</td>
                        <td>{totalGrams.toFixed(3)}</td>
                        <td>${typeof(totalCost) === "number" ? totalCost.toFixed(2) : "NaN"}</td>
                    </tr>
                </tbody>
            </table>
            <p>{ingredientsText}</p>
        </div>
    );
}

export default OrderPricing;
