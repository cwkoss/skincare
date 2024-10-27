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
    const [error, setError] = useState(null);

    const totalGrams = ingredientList.reduce((sum, ingredient) => sum + ingredient.grams, 0);
    const totalCost = ingredientList.reduce((sum, ingredient) => sum + ingredient.cost, 0);
    const totalParts = recipeData ? Object.values(recipeData).reduce((sum, part) => sum + part, 0) : 0;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const recipeId = searchParams.get('recipeId');

        const fetchData = async () => {
            if (recipeId) {
                try {
                    // First, try to fetch from 'recipes' table
                    const recipeDoc = await getDoc(doc(db, "recipes", recipeId));
                    if (recipeDoc.exists()) {
                        const data = recipeDoc.data();
                        console.log("Recipe data:", data);
                        setRecipeData(data.rawRecipe); // Set recipeData to rawRecipe
                        return;
                    }

                    // If not found in 'recipes', try 'formulations' table
                    const formulationDoc = await getDoc(doc(db, "formulations", recipeId));
                    if (formulationDoc.exists()) {
                        const data = formulationDoc.data().rawRecipe;
                        console.log("Formulation data:", data);
                        setRecipeData(data);
                        return;
                    }

                    // If not found in either table, set error
                    setError("Cannot find recipe by ID");
                } catch (err) {
                    console.error("Error fetching recipe:", err);
                    setError("Error fetching recipe");
                }
            }
        };

        fetchData();
    }, [location.search]);

    useEffect(() => {
        if (recipeData && totalParts > 0) {
            const ingredientsText = Object.entries(recipeData)
                .sort((a, b) => b[1] - a[1])
                .map(([name, parts]) => {
                    const percentage = ((parts / totalParts) * 100);
                    return `${name} (${percentage.toFixed(2)}%)`;
                })
                .join(', ');

            setIngredientsText(`Base Recipe Ingredients: ${ingredientsText}`);
        }
    }, [recipeData, totalParts]);

    const calculateIngredients = useCallback(() => {
        if (recipeData) {
            const totalParts = Object.values(recipeData).reduce((sum, part) => sum + part, 0);
            const newIngredientList = Object.entries(recipeData).map(([name, parts]) => {
                const ingredientGrams = (targetGrams / totalParts) * parts;
                const ingredientCost = ingredients[name]?.cost_per_g ? ingredients[name].cost_per_g * ingredientGrams : "N/A";
                return {
                    name,
                    parts: parts,
                    grams: ingredientGrams,
                    cost: ingredientCost,
                    type: ingredients[name]?.type || 'Unknown'
                };
            });
            setIngredientList(newIngredientList);
        }
    }, [recipeData, targetGrams]);

    useEffect(() => {
        if (recipeData && targetGrams > 0) {
            calculateIngredients();
        }
    }, [recipeData, targetGrams, calculateIngredients]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!recipeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-pricing">
            <h1>Order Pricing</h1>
            <input
                type="number"
                value={targetGrams}
                onChange={(e) => setTargetGrams(Number(e.target.value))}
                placeholder="Target Grams"
            />
            <table>
                <thead>
                    <tr>
                        <th>Parts</th>
                        <th>Ingredient</th>
                        <th>Type</th>

                        <th>Grams</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredientList.sort((a, b) => a.type.localeCompare(b.type))
                        .map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient.parts.toFixed(2)}</td>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.type}</td>
                                <td>{ingredient.grams.toFixed(3)}</td>
                                <td>${typeof (ingredient.cost) === "number" ? ingredient.cost.toFixed(2) : "NaN"}</td>
                            </tr>
                        ))}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td>{totalParts}</td>
                        <td>{totalGrams.toFixed(3)}</td>
                        <td>${typeof (totalCost) === "number" ? totalCost.toFixed(2) : "NaN"}</td>
                    </tr>
                </tbody>
            </table>
            <p>{ingredientsText}</p>
        </div>
    );
}

export default OrderPricing;
