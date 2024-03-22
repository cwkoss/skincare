import React, { useState } from 'react';

function ProportionAdjuster({ initialIngredients, updateRecipe, onSaveChanges }) {
    const [ingredients, setIngredients] = useState(initialIngredients);

    const handleProportionChange = (ingredientName, newValue) => {
        const newAmount = parseFloat(newValue);
        setIngredients(prevIngredients => ({
            ...prevIngredients,
            [ingredientName]: newAmount
        }));
    };

    const handleSaveChanges = () => {
        updateRecipe(ingredients);
        onSaveChanges();
    };

    return (
        <div className="recipe-builder-container">
            <h3>Adjust Proportions</h3>
            <div className="scrollable-content">
                {Object.entries(ingredients).map(([name, amount]) => (
                    <div key={name} className="ingredient-slider">
                        <label>
                            {name}: {amount.toFixed(0)}
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={amount}
                                onChange={(e) => handleProportionChange(name, e.target.value)}

                            />
                        </label>
                    </div>
                ))}
            </div>
            <button>Get AI Proportion Suggestion</button><br />
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
}

export default ProportionAdjuster;
