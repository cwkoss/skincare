import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

function SavedRecipe() {
    const [recipeData, setRecipeData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = location.state?.recipeId;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramRecipeId = searchParams.get('recipeId');
        if(paramRecipeId) {
            const fetchData = async () => {
                const docRef = doc(db, "formulations", paramRecipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipeData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchData();
        }
            
        else if (recipeId) {
            const fetchData = async () => {
                const docRef = doc(db, "formulations", recipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipeData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchData();
        }
    }, [recipeId, location.search]);

    const handleShareRecipe = () => {
        const currentUrl = window.location.href;
        const shareUrl = `${currentUrl}?recipeId=${recipeId}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Recipe URL copied to clipboard!');
    };

    const handleOrderFormulation = () => {
        navigate('/order-formulation', { state: { recipeId } });
        // Or another logic for ordering the formulation
    };

    if (!recipeData) return <div>Loading...</div>;

    return (
        <div>
            <h2>{recipeData.name}</h2>
            <div className="recipe">
                {Object.keys(recipeData.ingredients).map((key, index) => (
                    <div key={index}>
                        <strong>{key}</strong>: {recipeData.ingredients[key]}
                    </div>
                ))}
            </div>
            <button onClick={handleShareRecipe}>Share this Recipe</button>
            <button onClick={handleOrderFormulation}>Order Formulation of this Recipe</button>
        </div>
    );
}

export default SavedRecipe;
