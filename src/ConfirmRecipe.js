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
    let totalAdditivePercent = 0;

    // Add emulsifier percentages directly to the overall percentages, filtering out "oil" and "aqueous"
    Object.keys(emulsifierPercentages).forEach(emulsifier => {
      if (emulsifier === "oil" || emulsifier === "aqueous") {
        return;
      }
      const percentage = parseFloat(emulsifierPercentages[emulsifier]);
      if (overallPercentages[emulsifier]) {
        overallPercentages[emulsifier] += percentage;
      } else {
        overallPercentages[emulsifier] = percentage;
      }
    });

    Object.keys(state.recipe).forEach(phase => {
      if (phase !== 'emulsifier') {
        const phaseIngredients = state.recipe[phase].ingredients;
        const totalParts = Object.values(phaseIngredients).reduce((total, part) => total + part, 0);

        Object.keys(phaseIngredients).forEach(ingredient => {
          const ingredientPhase = ingredients[ingredient]?.phase;

          if (ingredientPhase === 'additive' && ingredients[ingredient]?.default_percent) {
            const defaultPercent = ingredients[ingredient].default_percent;
            overallPercentages[ingredient] = defaultPercent;
            totalAdditivePercent += defaultPercent;
          } else if (ingredientPhase && emulsifierPercentages[ingredientPhase]) {
            const phasePercentage = parseFloat(emulsifierPercentages[ingredientPhase]);
            const ingredientPercentage = (phaseIngredients[ingredient] / totalParts) * phasePercentage;
            if (overallPercentages[ingredient]) {
              overallPercentages[ingredient] += ingredientPercentage;
            } else {
              overallPercentages[ingredient] = ingredientPercentage;
            }
          }
        });
      }
    });

    // Adjust non-additive ingredients by the remaining percentage
    const remainingPercentage = 100 - totalAdditivePercent;
    const totalNonAdditivePercentage = Object.keys(overallPercentages).reduce((total, ingredient) => {
      if (ingredients[ingredient]?.phase !== 'additive') {
        return total + overallPercentages[ingredient];
      }
      return total;
    }, 0);

    Object.keys(overallPercentages).forEach(ingredient => {
      if (ingredients[ingredient]?.phase !== 'additive') {
        overallPercentages[ingredient] = (overallPercentages[ingredient] / totalNonAdditivePercentage) * remainingPercentage;
      }
    });

    return overallPercentages;
  };

  const overallPercentages = calculateOverallPercentages();

  const totalPercentage = Object.values(overallPercentages).reduce((total, value) => total + value, 0);

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
            {Object.entries(overallPercentages)
                          .sort(([, a], [, b]) => b - a)
                          .map(([ingredient, percentage], index) => (
              <li key={index}>{ingredient}: {percentage.toFixed(2)}%</li>
            ))}
          </ul>

        ) : (
          <p>No overall percentages available.</p>
        )}
          <span>{ totalPercentage}</span>
      </div>
    </Layout>
  );
}

export default ConfirmRecipe;
