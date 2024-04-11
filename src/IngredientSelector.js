import React, { useState } from 'react';

function IngredientSelector({ ingredients, initialSelectedIngredients, updateRecipe, onSaveChanges }) {
    const [selectedIngredients, setSelectedIngredients] = useState(initialSelectedIngredients);

    const toggleIngredientSelection = (name) => {
        const currentAmount = selectedIngredients[name];
        const newSelectedIngredients = {
            ...selectedIngredients,
            [name]: currentAmount ? undefined : 5 // If currently selected, remove; otherwise, set to 5
        };

        // Filter out any undefined entries to truly remove them from the object
        Object.keys(newSelectedIngredients).forEach(key => {
            if (newSelectedIngredients[key] === undefined) {
                delete newSelectedIngredients[key];
            }
        });

        setSelectedIngredients(newSelectedIngredients);

    newSelectedIngredients.commentary = "Changed ingredients";
    updateRecipe(newSelectedIngredients);
    };

    const handleSave = () => {
        onSaveChanges();
    };

    return (
        <div>
            <h3>Available Ingredients:</h3>
            <div className="ingredients-list">
                {Object.entries(ingredients).map(([name, details]) => (
                    <div
                        key={name}
                        className={`ingredient-row ${selectedIngredients[name] > 0 ? 'selected' : ''}`}
                        onClick={() => toggleIngredientSelection(name)}
                    >
                        <strong>{name}</strong>: <small>{details.description}</small>
                    </div>
                ))}
            </div>
            <button onClick={handleSave}>Save Selection</button>
        </div>
    );
}

export default IngredientSelector;
