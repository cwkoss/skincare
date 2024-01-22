import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FinalizeRecipe() {
    const location = useLocation();
    const recipe = location.state?.recipe;
    const [recipeName, setRecipeName] = useState('');
    const navigate = useNavigate();

    const handleChangeIngredients = () => {
        navigate('/change-ingredients'); // Navigate to the change ingredients page
    };

    const handleChangeProportions = () => {
        navigate('/recipe-builder'); // Navigate to the change proportions page
    };

    const handleConfirmAndSave = () => {
        // Logic to save the recipe
        const savedRecipe = { name: recipeName, ingredients: recipe };
        console.log('Recipe confirmed and saved:', savedRecipe);
        // Navigate to a confirmation page or display a success message
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
