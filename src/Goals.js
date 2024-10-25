import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSession } from './sessionUtils';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';


function Goals() {
  const { state, dispatch } = useRecipe();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [includeFragrance, setIncludeFragrance] = useState('no');

  var skincareGoals = [];

  if (state.productData === "Hair and Scalp Oil") {
    skincareGoals = ["Dry Scalp", "Hair Vitality", "Hair Shine", "Frizz Control", "Curl Definition", "Scalp Soothing"];
  } else if (state.productData === "Body Moisturizing Cream or Body Butter") {
    skincareGoals = ["Oily Skin", "Dry skin", "Sensitive Skin", "Softer Skin", "Skin Elasticity", "Uneven Skin Tone"];
  } else {
    skincareGoals = [
      "Oily Skin", "Dry Skin", "Soothing", "Wrinkles",
      "Puffiness", "Dullness", "Aging", "Large Pores"
    ];
  }

  console.log(selectedOptions.length === 0, includeFragrance);

  const updateGoalsData = (newGoalsData) => {
    dispatch({ type: 'SET_GOALS_DATA', payload: newGoalsData });
  };

  const updateIncludeFragrance = (fragrance) => {
    dispatch({ type: 'SET_INCLUDE_FRAGRANCE', payload: fragrance });
  };

  const toggleOption = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
  };

  const isOptionSelected = (option) => {
    return selectedOptions.includes(option);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to send to Firestore
    const sessionData = {
      selectedOptions,
      includeFragrance
    };
  
    // Call updateSession to update Firestore document and navigate upon completion
    updateSession(sessionData).then(() => {
      updateGoalsData(selectedOptions); 
      updateIncludeFragrance(includeFragrance);
      navigate('/phase-choices');
    });
  };
  

  return (
    <Layout title="Select Your Skincare Goals + Concerns"
            isSubmitDisabled={selectedOptions.length === 0 || (includeFragrance === 'yes' && selectedMoods.length === 0)}
            handleSubmit={handleSubmit}
            buttonText="Next">
      <form>
        <div className="multiselect-container">
          {skincareGoals.map((goal, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleOption(goal)}
              className={`multiselect-button ${isOptionSelected(goal) ? 'selected' : ''}`}
            >
              {goal}
            </button>
          ))}
        </div>
      </form>
    </Layout>
  );
}

export default Goals;
