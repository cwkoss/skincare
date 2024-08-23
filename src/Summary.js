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
  "carrier": "The oil phase provides a base for the formulation, delivering hydration and nourishment to the skin while helping to dilute and spread active ingredients evenly.",
  "aqueous": "The aqueous phase is responsible for hydrating the skin and delivering water-soluble ingredients, forming the foundation of emulsions and adding moisture to the formulation.",
  "active": "The active phase contains potent ingredients that target specific skin concerns, such as anti-aging, brightening, or soothing, providing the primary therapeutic benefits of the product.",
  "fragrance": "The fragrance phase enhances the sensory experience of the product by adding pleasant scents, which can also have therapeutic properties, contributing to the overall appeal and enjoyment of the skincare routine.",
  "preservative": "The preservative phase ensures the stability and safety of the product by preventing the growth of bacteria, mold, and other microorganisms, thereby extending the shelf life of the formulation."
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
    <Layout title="Your Selections"
      handleSubmit={handleAIClick}
      buttonText="Generate a Formulation with AI"
      isSubmitDisabled={loading}
      whyDisabled="Loading...">

      <h3>How it works</h3>
      Skincare recipes have a bunch of phases, each with a specific purpose. Here are the phases we'll be working with:
      <ul>
        <li>Carrier: {phaseDescriptions.carrier}</li>
        <li>Aqueous: {phaseDescriptions.aqueous}</li>
        <li>Active: {phaseDescriptions.active}</li>
        <li>Fragrance: {phaseDescriptions.fragrance}</li>
        <li>Preservative: {phaseDescriptions.preservative}</li>
      </ul>

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
