import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from './RecipeContext';
import Layout from './Layout';
import { Button, TextField, Typography, Box, Chip } from '@mui/material';

const variationOptions = [
  'More Hydrating',
  'More Moisturizing',
  'Gentler',
  'Different Fragrance',
  'Longer Lasting',
  'Faster Absorbing',
];

export default function VariationRequest() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customRequest, setCustomRequest] = useState('');
  const { dispatch } = useRecipe();
  const navigate = useNavigate();

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    dispatch({
      type: 'SET_VARIATION_REQUEST',
      payload: { selectedOptions, customRequest }
    });
    
    navigate('/order-formulation');
  };

  const isFormEmpty = selectedOptions.length === 0 && customRequest.trim() === '';

  return (
    <Layout
      title="Request a Recipe Variation"
      handleSubmit={handleSubmit}
      isSubmitDisabled={isFormEmpty}
      whyDisabled="Please select at least one option or enter a custom request"
      buttonText="Submit Variation Request"
    >
      <p>Now that you've completed a base recipe, what kind of variation would you like?</p>
      <div className="variation-options">
        {variationOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleOptionToggle(option)}
            className={`multiselect-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        className="big-text-area"
        placeholder="Enter your custom variation request here..."
        value={customRequest}
        onChange={(e) => setCustomRequest(e.target.value)}
      />
    </Layout>
  );
}
