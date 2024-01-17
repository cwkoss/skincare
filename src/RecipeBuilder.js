import React, { useState } from 'react';
import ingredients from './ingredients';

function RecipeBuilder() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showIngredientsList, setShowIngredientsList] = useState(false);

  const handleIngredientSelect = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      // Deselect the ingredient
      setSelectedIngredients(selectedIngredients.filter(name => name !== ingredientName));
    } else {
      // Select the ingredient
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const isIngredientSelected = (ingredientName) => {
    return selectedIngredients.includes(ingredientName);
  };

  const ingredientRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const selectedStyle = {
    backgroundColor: '#e0f7fa',
  };

  return (
    <div>
      <h2>Recipe Builder</h2>
      <button onClick={() => setShowIngredientsList(!showIngredientsList)}>
        {showIngredientsList ? 'Hide Ingredients' : 'Choose Ingredients'}
      </button>

      {showIngredientsList && (
        <div>
          <h3>Available Ingredients:</h3>
          {Object.entries(ingredients).map(([name, details]) => (
            <div
              key={name}
              style={{ ...ingredientRowStyle, ...(isIngredientSelected(name) ? selectedStyle : {}) }}
              onClick={() => handleIngredientSelect(name)}
            >
              <strong>{name}</strong>
              <small>{details.description}</small>
            </div>
          ))}
        </div>
      )}

      <h3>Selected Ingredients:</h3>
      <ul>
        {selectedIngredients.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/* Future content for proportions goes here */}
    </div>
  );
}

export default RecipeBuilder;
