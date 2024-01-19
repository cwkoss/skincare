import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Summary({ form1Data, form2Data }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAIClick = () => {
    setLoading(true);
    const endpoint = 'https://us-central1-skincare-recipe-tool.cloudfunctions.net/getInitialRecipe';
    const goals = form1Data.join(', ');
    const productType = form2Data;

    const data = {
        text: `Hello, I am trying to formulate a ${productType} for ${goals}. Please suggest a recipe?`,
    };

    console.log('Sending OpenAI request: ', data.text);

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        setLoading(false);
        console.log('Success:', data);
        const recipeResponse = data.reply.choices[0].message.content;
        console.log("recipeResponse", recipeResponse);
        navigate('/recipe-builder', { state: { recipeResponse } });
    })
    .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
        // Handle error state here, e.g., display an error message
    });
  };

  const handleManualClick = () => {
    navigate('/recipe-builder'); // Replace with your actual route
  };

  return (
    <div>
      <h2>Your Selections</h2>
      <h3>Skincare Goals/Concerns:</h3>
      <ul>
        {form1Data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Selected Skincare Product:</h3>
      <p>{form2Data}</p>

      {loading ? (
        <p>Loading...</p> // Placeholder for loading spinner
      ) : (
        <>
          <button onClick={handleAIClick}>AI Recipe Generation</button>
          <button onClick={handleManualClick}>Build Recipe Manually</button>
        </>
      )}
    </div>
  );
}

export default Summary;
