import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ingredients from './ingredients';
import { updateSession } from './sessionUtils';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';
import { useFeatureFlag } from './FeatureFlagContext';

const loadingMessages = [
  "AI is preparing a recipe for you...",
  "Considering which ingredients will work best for your concerns...",
  "Balancing proportions to ensure proper texture...",
  "Optimizing for your skin type...",
  "Finalizing the perfect skincare formula...",
  "Almost there, just adding the finishing touches..."
];

function Summary() {
  const { state } = useRecipe();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);


  const handleAIClick = () => {

    navigate('/phase-choices');

  };



  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentMessage(prevMessage => {
          const index = loadingMessages.indexOf(prevMessage);
          const nextIndex = (index + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 4000); // Change message every 4 seconds

      return () => clearInterval(interval);
    }
  }, [loading]);

  /*const handleManualClick = () => {
    navigate('/recipe-builder'); // Replace with your actual route
  };*/

  function formatIngredientsList(ingredients) {
    let formattedString = "";

    Object.keys(ingredients).forEach((key, index, array) => {
      formattedString += key;

      if (ingredients[key].hasOwnProperty('default_percent') || ingredients[key].hasOwnProperty('max_percent')) {
        formattedString += " (";

        if (ingredients[key].hasOwnProperty('default_percent')) {
          formattedString += `default: ${ingredients[key].default_percent}`;
          if (ingredients[key].hasOwnProperty('max_percent')) {
            formattedString += ", ";
          }
        }

        if (ingredients[key].hasOwnProperty('max_percent')) {
          formattedString += `max: ${ingredients[key].max_percent}`;
        }

        formattedString += ")";
      }

      if (index < array.length - 1) {
        formattedString += ", ";
      }
    });

    return formattedString;
  }

  return (
    <Layout title="Your Selections"
      handleSubmit={handleAIClick}
      buttonText="Generate a Formulation with AI"
      isSubmitDisabled={loading}
      whyDisabled="Loading...">

      <h3>Selected Skincare Product:</h3>
      <ul><li>{state.productData.charAt(0).toUpperCase() + state.productData.slice(1)}</li></ul>

      <h3>Skincare Goals/Concerns:</h3>
      <ul>
        {state.goalsData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>



      <h3>Include Fragrance: </h3>
      <ul><li>{state.includeFragrance.charAt(0).toUpperCase() + state.includeFragrance.slice(1)}</li></ul>
      {state.includeFragrance === 'yes' && (
        <>
          <h3>Selected Moods:</h3>
          <ul>
            {state.selectedMoods.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p className="loading-message">{currentMessage}</p>
        </div>
      ) : (
        <>
          {/*<button onClick={handleManualClick}>Choose Ingredients Manually</button>*/}
        </>
      )}
    </Layout>
  );
}

export default Summary;
