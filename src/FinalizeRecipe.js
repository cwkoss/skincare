import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore'
import { updateSession } from './sessionUtils';

function FinalizeRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;
    const commentary = location.state?.commentary;

    const isRecipeNameValid = recipeName.trim().length > 0;

    // Handler to save the recipe
    const handleConfirmAndSave = async () => {
        try {
            const recipeId = recipeName
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, '') // Strip out all non-alphanumeric characters
                .replace(/ /g, '-') + "-" + new Date().getTime();

            console.log(recipeId);
            console.log(location.state);
            await setDoc(doc(db, "formulations", recipeId), {
                name: recipeName,
                ingredients: recipe,
                commentary: commentary,
                createdAt: new Date()
            });
            console.log("Document written with ID: ", recipeId);

            // Update the session with the new recipeId
            await updateSession({ recipeId: recipeId });

            navigate('/saved-recipe', { state: { recipeId: recipeId } });
        } catch (e) {
            console.error("Error adding document: ", e);
            // Show an error message or handle the error as needed
        }
    };
    const handleChangeIngredients = () => {
        navigate('/change-ingredients'); // Navigate to the change ingredients page
    };

    const handleChangeProportions = () => {
        navigate('/recipe-builder'); // Navigate to the change proportions page
    };

    return (
        <div className="body-container">
            <h2>Name Your Custom Skincare Recipe</h2>
            <input
                type="text"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            <h2>Your Base Recipe</h2>
            <div className="recipe">
                {recipe && Object.keys(recipe).map((key, index) => (
                    <div className="recipe-row" key={index}>
                        <strong>{key}:</strong> <span className="align-right">{recipe[key].toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="actions">
                <button onClick={handleChangeIngredients}>Change Ingredients</button>
                <button onClick={handleChangeProportions}>Change Proportions</button>
                <button className="submit" onClick={handleConfirmAndSave} disabled={!isRecipeNameValid}>Save Base Recipe</button>
            </div>
            {!isRecipeNameValid && (
                <p className="why-disabled">Please enter a recipe name.</p>
            )}
        </div>
    );
}

export default FinalizeRecipe;
