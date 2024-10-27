import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

function SavedRecipe() {
    const [recipeData, setRecipeData] = useState(null);
    const [creatorName, setCreatorName] = useState('Unknown');
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (recipeId) {
                const docRef = doc(db, "recipes", recipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setRecipeData(data);
                    fetchCreatorName(data.creatorId);
                } else {
                    console.log("No such document!");
                }
            }
        };

        const fetchCreatorName = async (creatorId) => {
            if (creatorId) {
                const userDocRef = doc(db, "users", creatorId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setCreatorName(userData.displayName || 'Unknown');
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
            <p><strong>Creator:</strong> {creatorName}</p>
            <div className="recipe-details">
                <h3>Ingredients:</h3>
                {recipeData.recipe && Object.keys(recipeData.recipe).length > 0 ? (
                    Object.keys(recipeData.recipe).map((phase, index) => (
                        <div key={index}>
                            <h4>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h4>
                            <ul>
                                {Object.keys(recipeData.recipe[phase].ingredients || {}).map(ingredient => (
                                    <li key={ingredient}>
                                        {ingredient}: {recipeData.rawRecipe && recipeData.rawRecipe[ingredient] ? parseFloat(recipeData.rawRecipe[ingredient]).toFixed(2) : '0.00'}%
                                    </li>
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
