import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';
import ingredients from './ingredients';
import { useNavigate } from 'react-router-dom';

function ConfirmRecipe() {
  const { state, dispatch } = useRecipe();
  
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState(state.recipeName || '');

 /* TODO REMOVE useEffect(() => {

  }, [recipeName, dispatch]);*/

  const goToNextPhase = () => {
    dispatch({ type: 'SET_RECIPE_NAME', payload: recipeName });
    dispatch({ type: 'SET_BASE_NAME', payload: recipeName });
    dispatch({ type: "SET_RAW_RECIPE", payload: overallPercentages });
    navigate('/order-formulation');
    alert("Recipe Confirmed!");
  };
  const calculateOverallPercentages = () => {
    const overallPercentages = {};
    let totalAdditivePercent = 0;
    let totalEmulsifierPercent = 0;
    
    // Check if the emulsifier phase is present
    if (state.recipe && state.recipe.emulsifier && state.recipe.emulsifier.ingredients) {
      const emulsifierPercentages = state.recipe.emulsifier.ingredients;
    
      // Add emulsifier percentages directly to the overall percentages, excluding "oil" and "aqueous"
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
        totalEmulsifierPercent += percentage;
      });
    }
    
    Object.keys(state.recipe).forEach(phase => {
      if (phase !== 'emulsifier' && state.recipe[phase].ingredients && Object.keys(state.recipe[phase].ingredients).length > 0) {
        const phaseIngredients = state.recipe[phase].ingredients;
        const totalParts = Object.values(phaseIngredients).reduce((total, part) => total + part, 0);
    
        Object.keys(phaseIngredients).forEach(ingredient => {
          const ingredientPhase = ingredients[ingredient]?.phase;
    
          if (ingredientPhase === 'additive' && ingredients[ingredient]?.default_percent) {
            const defaultPercent = ingredients[ingredient].default_percent;
            overallPercentages[ingredient] = defaultPercent;
            totalAdditivePercent += defaultPercent;
          } else if (ingredientPhase && state.recipe.emulsifier && state.recipe.emulsifier.ingredients && state.recipe.emulsifier.ingredients[ingredientPhase]) {
            const phasePercentage = parseFloat(state.recipe.emulsifier.ingredients[ingredientPhase]);
            const ingredientPercentage = (phaseIngredients[ingredient] / totalParts) * phasePercentage;
            if (overallPercentages[ingredient]) {
              overallPercentages[ingredient] += ingredientPercentage;
            } else {
              overallPercentages[ingredient] = ingredientPercentage;
            }
          } else {
            const ingredientPercentage = (phaseIngredients[ingredient] / totalParts) * 100; // No emulsifier, direct percentage
            if (overallPercentages[ingredient]) {
              overallPercentages[ingredient] += ingredientPercentage;
            } else {
              overallPercentages[ingredient] = ingredientPercentage;
            }
          }
        });
      }
    });
    
    // Adjust non-additive, non-emulsifier ingredients by the remaining percentage
    const remainingPercentage = 100 - totalAdditivePercent - totalEmulsifierPercent;
    const totalNonAdditiveNonEmulsifierPercentage = Object.keys(overallPercentages).reduce((total, ingredient) => {
      if (ingredients[ingredient]?.phase !== 'additive' && !(state.recipe.emulsifier && state.recipe.emulsifier.ingredients && state.recipe.emulsifier.ingredients[ingredient])) {
        return total + overallPercentages[ingredient];
      }
      return total;
    }, 0);
    
    Object.keys(overallPercentages).forEach(ingredient => {
      if (ingredients[ingredient]?.phase !== 'additive' && !(state.recipe.emulsifier && state.recipe.emulsifier.ingredients && state.recipe.emulsifier.ingredients[ingredient])) {
        overallPercentages[ingredient] = (overallPercentages[ingredient] / totalNonAdditiveNonEmulsifierPercentage) * remainingPercentage;
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
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter recipe name"
          />
        </label>

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
      </div>
    </Layout>
  );
}

/*
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
          */

export default ConfirmRecipe;
