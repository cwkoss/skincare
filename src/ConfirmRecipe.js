import React from 'react';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';
import ingredients from './ingredients';

function ConfirmRecipe() {
  const { state } = useRecipe();

  const goToNextPhase = () => {
    alert("Recipe Confirmed!");
  };

  const calculateOverallPercentages = () => {
    if (!state.recipe || !state.recipe.emulsifier || !state.recipe.emulsifier.ingredients) {
      return {};
    }

    const emulsifierPercentages = state.recipe.emulsifier.ingredients;
    const overallPercentages = {};

    Object.keys(state.recipe).forEach(phase => {
      if (phase !== 'emulsifier') {
        const phaseIngredients = state.recipe[phase].ingredients;
        const totalParts = Object.values(phaseIngredients).reduce((total, part) => total + part, 0);
        const phasePercentage = parseFloat(emulsifierPercentages[phase.replace('Phase', '')]);

        Object.keys(phaseIngredients).forEach(ingredient => {
          const ingredientPercentage = (phaseIngredients[ingredient] / totalParts) * phasePercentage;
          if (overallPercentages[ingredient]) {
            overallPercentages[ingredient] += ingredientPercentage;
          } else {
            overallPercentages[ingredient] = ingredientPercentage;
          }
        });
      }
    });

    return overallPercentages;
  };

  const overallPercentages = calculateOverallPercentages();

  return (
    <Layout title="Confirm Your Recipe"
      buttonText="Confirm Recipe"
      handleSubmit={() => { goToNextPhase() }}>
      <div>
        {state.recipe && Object.keys(state.recipe).length > 0 ? (
          Object.keys(state.recipe).map((phase, index) => (
            <div key={index}>
              <h3>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h3>
              <p><strong>Title:</strong> {state.recipe[phase].title}</p>
              <p><strong>Ingredients:</strong> {state.recipe[phase].ingredients ? Object.entries(state.recipe[phase].ingredients).map(([key, value]) => `${key}: ${value}`).join(', ') : 'No ingredients listed'}</p>
              <p><strong>Description:</strong> {state.recipe[phase].description}</p>
            </div>
          ))
        ) : (
          <p>No recipe data available.</p>
        )}

        <h2>Overall Percentages</h2>
        {Object.keys(overallPercentages).length > 0 ? (
          <ul>
            {Object.entries(overallPercentages).map(([ingredient, percentage], index) => (
              <li key={index}>{ingredient}: {percentage.toFixed(2)}%</li>
            ))}
          </ul>
        ) : (
          <p>No overall percentages available.</p>
        )}

        <p>Debug dump: {JSON.stringify(state.recipe)}</p>
      </div>
    </Layout>
  );
}

export default ConfirmRecipe;
