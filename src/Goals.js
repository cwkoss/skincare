import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Goals.css';

function Goals({ setGoalsData }) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const skincareGoals = [
    "Adult acne", "Aging or age spots", "Wrinkles", "Large pores", 
    "Puffiness", "Redness", "Sun Protection", "Dry skin", 
    "Atopic dermatitis"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoalsData(selectedOptions); 
    // Navigate to the next form
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
        <button type="submit" disabled={selectedOptions.length === 0}>Next</button>
      </form>
    </div>
  );
}

export default Goals;
