import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSession } from './sessionUtils';


function Goals({ productData, setGoalsData, setSelectedMoodsApp, setIncludeFragranceApp }) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [includeFragrance, setIncludeFragrance] = useState('no');
  const [selectedMoods, setSelectedMoods] = useState([]);

  var skincareGoals = [];

  if (productData === "Hair and Scalp Oil") {
    skincareGoals = ["Dry scalp", "Hair growth", "Hair shine", "Hair strength"];
  } else if (productData === "Body Moisturizing Cream or Body Butter") {
    skincareGoals = ["Dry skin", "Sensitive Skin", "Sun Protection", "Stretch marks", "Eczema", "Aging or age spots"];
  } else {
    skincareGoals = [
      "Adult acne", "Dry skin", "Sensitive Skin", "Wrinkles",
      "Puffiness", "Redness", "Sun Protection", "Aging or age spots", "Large pores",
      "Eczema"
    ];
  }



  /*
  const goalsToIngredients = {
    "Adult acne": ["Tea Tree Oil", "Green Tea", "Honey", "Apple Cider Vinegar", "Zinc Oxide"],
    "Dry skin": ["Shea Butter", "Cocoa Butter", "Hyaluronic Acid", "Olive Oil", "Coconut Oil"],
    "Sensitive Skin": ["Aloe Vera Gel", "Oat Milk", "Sunflower Oil", "Jojoba Oil", "Cucumber Juice"],
    "Wrinkles": ["Argan Oil", "Retinol", "Hyaluronic Acid", "Vitamin C", "Rosemary Oil"],
    "Puffiness": ["Cucumber Juice", "Green Tea", "Aloe Vera Gel", "Peppermint Oil", "Tea Tree Oil"],
    "Redness": ["Aloe Vera Gel", "Cucumber Juice", "Green Tea", "Niacinamide (Vitamin B3)", "Oat Milk"],
    "Sun Protection": ["Zinc Oxide", "Vitamin C", "Vitamin E", "Coconut Oil", "Shea Butter"],
    "Aging or age spots": ["Vitamin C", "Retinol", "Hyaluronic Acid", "Argan Oil", "Niacinamide (Vitamin B3)"],
    "Large pores": ["Apple Cider Vinegar", "Green Tea", "Clay (if available, not in list)", "Honey", "Tea Tree Oil"],
    "Atopic dermatitis": ["Oat Milk", "Sunflower Oil", "Shea Butter", "Aloe Vera Gel", "Cocoa Butter"]
};*/


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
    // Prepare the data to send to Firestore
    const sessionData = {
      selectedOptions,
      includeFragrance,
      selectedMoods,
    };
  
    // Call updateSession to update Firestore document and navigate upon completion
    updateSession(sessionData).then(() => {
      setGoalsData(selectedOptions); // Assuming you still want to do this for local state
      setSelectedMoodsApp(selectedMoods); // Assuming you still want to do this for local state
      setIncludeFragranceApp(includeFragrance); // Assuming you still want to do this for local state
      navigate('/summary');
    });
  };
  

  return (
    <div className="body-container">
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

        <button className="submit" type="submit" disabled={selectedOptions.length === 0 || (includeFragrance === 'yes' && selectedMoods.length === 0)}>Next</button>
      </form>
    </div>
  );
}

export default Goals;
