import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import { useRecipe } from './RecipeContext';
import Layout from './Layout';

const getPhaseEmoji = (phase) => {
    const emojis = {
        oil: '🫧',
        aqueous: '💧',
        active: '⚡',
        fragrance: '🌸',
        preservative: '🛡️',
        emulsifier: '🔄'
    };
    return emojis[phase] || '📦';
};

function SavedRecipe() {
    const [recipeData, setRecipeData] = useState(null);
    const [creatorName, setCreatorName] = useState('Unknown');
    const location = useLocation();
    const navigate = useNavigate();
    const recipeId = new URLSearchParams(location.search).get('id');
    const { dispatch } = useRecipe();

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

    const handleOrderClick = () => {
        dispatch({
            type: 'LOAD_SAVED_RECIPE',
            payload: {
                recipe: recipeData.recipe,
                rawRecipe: recipeData.rawRecipe,
                displayName: recipeData.displayName,
                baseName: recipeData.baseName,
                id: recipeId
            }
        });
        navigate('/variation-request');
    };

    return (
        <Layout 
            title={recipeData.displayName || recipeData.baseName}
            handleSubmit={handleOrderClick}
            buttonText="Order Formulation"
        >
            <div className="recipe-container">
                {/* Recipe Info Card */}
                <div className="card recipe-info">
                    <div className="recipe-metadata">
                        <p><i className="far fa-calendar"></i> Created: {createdAtString}</p>
                        <p><i className="far fa-user"></i> Creator: {creatorName}</p>
                    </div>
                </div>

                {/* Recipe Details Card */}
                <div className="card recipe-details">
                    <h3>Recipe Composition</h3>
                    {recipeData.recipe && Object.keys(recipeData.recipe).length > 0 ? (
                        <div className="phase-grid">
                            {Object.keys(recipeData.recipe).map((phase, index) => (
                                <div key={index} className="phase-card">
                                    <h4>
                                        <span className="phase-emoji">{getPhaseEmoji(phase)}</span>
                                        {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
                                    </h4>
                                    <div className="ingredients-list">
                                        {Object.keys(recipeData.recipe[phase].ingredients || {}).map(ingredient => (
                                            <div key={ingredient} className="ingredient-row">
                                                <span className="ingredient-name">{ingredient}</span>
                                                <span className="ingredient-percentage">
                                                    {recipeData.rawRecipe && recipeData.rawRecipe[ingredient] 
                                                        ? parseFloat(recipeData.rawRecipe[ingredient]).toFixed(1) + '%'
                                                        : '0.0%'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No ingredients listed.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default SavedRecipe;
