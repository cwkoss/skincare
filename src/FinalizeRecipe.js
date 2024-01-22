import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; 
import { collection, addDoc } from 'firebase/firestore'

function FinalizeRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;

    // Handler to save the recipe
    const handleConfirmAndSave = async () => {
        try {
            const docRef = await addDoc(collection(db, "formulations"), {
                name: recipeName,
                ingredients: recipe
            });
            console.log("Document written with ID: ", docRef.id);
            navigate('/saved-recipe', { state: { recipeId: docRef.id } }); 
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
