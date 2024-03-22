import React from 'react';

function IngredientSelector({ ingredients, selectedIngredients, onIngredientSelect }) {
    return (
        <div>
            <h3>Available Ingredients:</h3>
            <div className="ingredients-list">
                {Object.entries(ingredients).map(([name, details]) => (
                    <div
                        key={name}
                        className={`ingredient-row ${selectedIngredients[name] ? 'selected' : ''}`}
                        onClick={() => onIngredientSelect(name)}
                    >
                        <strong>{name}</strong>: <small>{details.description}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IngredientSelector;
