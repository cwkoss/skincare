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

    navigate('/product');

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
      buttonText="Let's Get Started!"
      isSubmitDisabled={loading}
      whyDisabled="Loading...">

      <div className="summary-content">
        <p className="intro-text">Welcome to our personalized skincare journey! Create custom skincare formulations tailored to your unique needs and preferences.</p>

        <ol className="steps-list">
          <li><b>Complete a Brief Questionnaire:</b> Answer questions about your skincare goals and concerns.</li>
          <li><b>Design Your Formula:</b> Choose from AI-suggested ingredients to build your base skincare product recipe.</li>
          <li><b>Create a Variation:</b> Experiment with a second version of your formula to find your perfect match.</li>
          <li><b>Try Your Customized Products:</b> Receive <b>TWO 1-oz portions</b> to try and compare.</li>
          <li><b>Refine and Reorder:</b> Choose your favorite and design a new variation for your next order.</li>
          <li><b>Perfect Your Skincare Recipe:</b> Repeat until you've found your perfect skincare recipe!</li>
        </ol>

        <p className="outro-text">Our service offers unparalleled personalization, ensuring your skincare products are as unique as you are.</p>
      </div>
    </Layout>
  );
}

export default Summary;
