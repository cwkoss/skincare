import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

function SavedRecipe() {
    const [recipeData, setRecipeData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (recipeId) {
                const docRef = doc(db, "recipes", recipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipeData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchRecipeData();
    }, [recipeId]);

    if (!recipeData) return <div>Loading...</div>;

    // Handle createdAt conversion
    let createdAtString = "Invalid Date";
    if (recipeData.createdAt) {
        const timestamp = typeof recipeData.createdAt === 'string' ? parseInt(recipeData.createdAt, 10) : recipeData.createdAt;
        const createdAt = new Date(timestamp);
        if (!isNaN(createdAt.getTime())) {
            createdAtString = createdAt.toLocaleString();
        }
    }

    return (
        <div>
            <h2>{recipeData.displayName || recipeData.baseName}</h2>
            <p><strong>Created At:</strong> {createdAtString}</p>
            <p><strong>Creator ID:</strong> {recipeData.creatorId}</p>
            <p><strong>Status:</strong> {recipeData.status}</p>
            <div className="recipe-details">
                <h3>Ingredients:</h3>
                {recipeData.recipe && Object.keys(recipeData.recipe).length > 0 ? (
                    Object.keys(recipeData.recipe).map((phase, index) => (
                        <div key={index}>
                            <h4>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h4>
                            <ul>
                                {Object.entries(recipeData.recipe[phase].ingredients || {}).map(([ingredient, amount]) => (
                                    <li key={ingredient}>{ingredient}: {amount}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No ingredients listed.</p>
                )}
            </div>
            <button onClick={() => navigate('/order-formulation', { state: { recipeId } })}>
                Order Formulation
            </button>
        </div>
    );
}

export default SavedRecipe;
