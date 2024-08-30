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

const phaseDescriptions = {
  "carrier": "The oil phase hydrates and nourishes skin, diluting and spreading active ingredients evenly.",
  "aqueous": "The aqueous phase hydrates skin and delivers water-soluble ingredients, forming the emulsion base.",
  "active": "The active phase targets specific skin concerns, providing the product's main therapeutic effects.",
  "fragrance": "The fragrance phase adds pleasant scents, enhancing the sensory experience and overall appeal.",
  "preservative": "The preservative phase prevents microbial growth, ensuring product stability and extending shelf life."
};


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


  return (
    <Layout title="How it works"
      handleSubmit={handleAIClick}
      buttonText="Generate a Formulation with AI"
      isSubmitDisabled={loading}
      whyDisabled="Loading...">

      <h3></h3>
      AI is going to help you make a {state.productData} formulation. 
      <br /><br /> For each 'phase' (groups of ingredients that are mixed into the formula at the same time),  AI will suggest options choose from. 
      <br /><br /> The AI will also suggest the order in which you should add the phases to your formulation. Here's a brief overview of each phase:
      <ol>
        <li> Emulsifier: Determines the consistency and texture of the product and allows oil and water to combine.</li>
        {Object.entries(phaseDescriptions).map(([phase, description]) => (
          <li key={phase}>{phase.charAt(0).toUpperCase() + phase.slice(1)}: {description}</li>
        ))}
      </ol>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p className="loading-message">{currentMessage}</p>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
}

export default Summary;
