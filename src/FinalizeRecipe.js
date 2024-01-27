import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore'

function FinalizeRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;
    const commentary = location.state?.commentary;

    // Handler to save the recipe
    const handleConfirmAndSave = async () => {
        try {
            const recipeId = recipeName
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, '') // Strip out all non-alphanumeric characters
                .replace(/ /g, '-') + "-" + new Date().getTime();

            console.log(recipeId);
            console.log(location.state);
            const docRef = await setDoc(doc(db, "formulations", recipeId), {
                name: recipeName,
                ingredients: recipe,
                commentary: commentary,
                createdAt: new Date()
            });
            console.log("Document written with ID: ", recipeId);
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
        <div>
            <h2>Name Your Custom Skincare Recipe</h2>
            <input
                type="text"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            <h2>Your Recipe</h2>
            <div className="recipe">
                {recipe && Object.keys(recipe).map((key, index) => (
                    <div key={index}>
                        <strong>{key}</strong>: {recipe[key]}
                    </div>
                ))}
            </div>

            <div className="actions">
                <button onClick={handleChangeIngredients}>Change Ingredients</button>
                <button onClick={handleChangeProportions}>Change Proportions</button>
                <button className="submit" onClick={handleConfirmAndSave}>Confirm and Save</button>
            </div>
        </div>
    );
}

export default FinalizeRecipe;
