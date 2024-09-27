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
    skincareGoals = ["Dry scalp", "Hair growth", "Hair shine", "Hair strength"];
  } else if (state.productData === "Body Moisturizing Cream or Body Butter") {
    skincareGoals = ["Dry skin", "Sensitive Skin", "Sun Protection", "Calloused Skin", "Stretch marks", "Eczema", "Aging"];
  } else {
    skincareGoals = [
      "Adult acne", "Dry skin", "Inflamation", "Wrinkles",
      "Puffiness", "Redness", "Aging", "Large pores"
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
      navigate('/summary');
    });
  };
  

  return (
    <Layout title="Select Your Skincare Goals/Concerns"
            isSubmitDisabled={selectedOptions.length === 0 || (includeFragrance === 'yes' && selectedMoods.length === 0)}
            handleSubmit={handleSubmit}
            buttonText="Next">
      <form>
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

      </form>
    </Layout>
  );
}

export default Goals;
