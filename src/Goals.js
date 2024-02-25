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
  const [selectedMoods, setSelectedMoods] = useState([]);

  var skincareGoals = [];

  if (state.productData === "Hair and Scalp Oil") {
    skincareGoals = ["Dry scalp", "Hair growth", "Hair shine", "Hair strength"];
  } else if (state.productData === "Body Moisturizing Cream or Body Butter") {
    skincareGoals = ["Dry skin", "Sensitive Skin", "Sun Protection", "Calloused Skin", "Stretch marks", "Eczema", "Aging or age spots"];
  } else {
    skincareGoals = [
      "Adult acne", "Dry skin", "Sensitive Skin", "Wrinkles",
      "Puffiness", "Redness", "Sun Protection", "Aging or age spots", "Large pores",
      "Eczema"
    ];
  }

  console.log(selectedOptions.length === 0, includeFragrance, selectedMoods);

  const moods = [
    "Fresh", "Relaxing", "Invigorated", "Pampered", "Focused", "Beautiful", "Confident", "Rejuvenated", "Empowered"
  ];

  const updateGoalsData = (newGoalsData) => {
    dispatch({ type: 'SET_GOALS_DATA', payload: newGoalsData });
  };

  const updateIncludeFragrance = (fragrance) => {
    dispatch({ type: 'SET_INCLUDE_FRAGRANCE', payload: fragrance });
  };

  const updateSelectedMoods = (moods) => {
    dispatch({ type: 'SET_SELECTED_MOODS', payload: moods });
  }

  const toggleOption = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
  };

  const isOptionSelected = (option) => {
    return selectedOptions.includes(option);
  };

  const toggleMood = (mood) => {
    const newSelectedMoods = selectedMoods.includes(mood)
      ? selectedMoods.filter(item => item !== mood)
      : [...selectedMoods, mood];

    setSelectedMoods(newSelectedMoods);
  };

  const isMoodSelected = (mood) => {
    return selectedMoods.includes(mood);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to send to Firestore
    const sessionData = {
      selectedOptions,
      includeFragrance,
      selectedMoods,
    };
  
    // Call updateSession to update Firestore document and navigate upon completion
    updateSession(sessionData).then(() => {
      updateGoalsData(selectedOptions); 
      updateIncludeFragrance(includeFragrance);
      updateSelectedMoods(selectedMoods);
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
            className={`goals-button ${isOptionSelected(goal) ? 'selected' : ''}`}
          >
            {goal}
          </button>
        ))}

        {/* Fragrance selection */}
        <div>
          <h3>Include natural fragrances?</h3>
          <button type="button" onClick={() => setIncludeFragrance('yes')} className={`goals-button ${includeFragrance === 'yes' ? 'selected' : ''}`}>Yes</button>
          <button type="button" onClick={() => setIncludeFragrance('no')} className={`goals-button ${includeFragrance === 'no' ? 'selected' : ''}`}>No</button>
        </div>

        {/* Mood selection, shown if fragrance is 'yes' */}
        {includeFragrance === 'yes' && (
          <div>
            <h3>How do you want the fragrance to make you feel?</h3>
            {moods.map((mood, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleMood(mood)}
                className={`goals-button ${isMoodSelected(mood) ? 'selected' : ''}`}
              >
                {mood}
              </button>
            ))}
          </div>
        )}
      </form>
    </Layout>
  );
}

export default Goals;
