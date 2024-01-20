import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Goals.css';

function Goals({ setGoalsData, setSelectedMoodsApp, setIncludeFragranceApp }) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [includeFragrance, setIncludeFragrance] = useState('no');
  const [selectedMoods, setSelectedMoods] = useState([]);

  const skincareGoals = [
    "Adult acne", "Dry skin", "Sensitive Skin", "Wrinkles",
    "Puffiness", "Redness", "Sun Protection", "Aging or age spots", "Large pores",
    "Atopic dermatitis"
  ];

  const moods = [
    "Fresh", "Relaxing", "Invigorated", "Pampered", "Focused", "Beautiful", "Confident", "Rejuvenated", "Empowered"
  ];

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
    setGoalsData(selectedOptions);
    setSelectedMoodsApp(selectedMoods);
    setIncludeFragranceApp(includeFragrance);
    navigate('/product');
  };

  return (
    <div>
      <h2>Select Your Skincare Goals/Concerns</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={selectedOptions.length === 0 || (includeFragrance === 'yes' && selectedMoods.length === 0)}>Next</button>
      </form>
    </div>
  );
}

export default Goals;
