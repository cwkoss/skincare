import React from 'react';
import ingredients from './ingredients'; 

function RecipeBuilder() {
  // Create an array of ingredient names
  const ingredientNames = Object.keys(ingredients);

  return (
    <div>
      <h2>Recipe Builder</h2>
      <h3>Available Ingredients:</h3>
      <ul>
        {ingredientNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeBuilder;
