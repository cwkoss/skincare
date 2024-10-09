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

      <ol>
  <li><b>Complete a Brief Questionnaire:</b> You'll answer a brief questionnaire to help us understand your skincare needs and goals.</li>
  <li><b>Build Your Base Recipe:</b> Based on your responses, you'll select customized options to build a base recipe tailored just for you.</li>
  <li><b>Create a Variation:</b> You'll choose a variation—tweaking your base recipe to experiment and further personalize your formula.</li>
  <li><b>Try Your Customized Products:</b> You'll receive <b>TWO 1-oz portions</b>—one of your base recipe and one of your variation (about a 1-3 month supply)—to try and compare.</li>
  <li><b>Refine and Reorder:</b> You'll choose your favorite and design a new variation based on that recipe for your next order, continually enhancing your skincare experience.</li>
  <li><b>Perfect Your Skincare Recipe:</b> Repeat every couple of months until you've found the <b>perfect skincare recipe</b> uniquely tailored to your skin!</li>
</ol>

      

    </Layout>
  );
}

export default Summary;
