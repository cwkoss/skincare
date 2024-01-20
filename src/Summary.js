import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ingredients from './ingredients';

function Summary({ goalsData, productData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAIClick = () => {
    setLoading(true);
    const endpoint = 'https://us-central1-skincare-recipe-tool.cloudfunctions.net/getInitialRecipe';
    const goals = goalsData.join(', ');
    const productType = productData;

    const data = {
        text: `Hello, I am trying to formulate a ${productType} for ${goals}. Please suggest a recipe?`,
        ingredients: formatIngredientsList(ingredients)
    };

    console.log('Sending OpenAI request: ', data.text, data.ingredients);

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
        setLoading(false);
        console.log('Success:', data);
        const recipeResponse = data.reply.choices[0].message.content;
        const parsedResponse = JSON.parse(recipeResponse);
        console.log(parsedResponse);
        navigate('/recipe-builder', { state: { recipe: parsedResponse } });
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

  function formatIngredientsList(ingredients) {
    let formattedString = "";

    Object.keys(ingredients).forEach((key, index, array) => {
        formattedString += key;

        if (ingredients[key].hasOwnProperty('default_percent') || ingredients[key].hasOwnProperty('max_percent')) {
            formattedString += " (";

            if (ingredients[key].hasOwnProperty('default_percent')) {
                formattedString += `default: ${ingredients[key].default_percent}`;
                if (ingredients[key].hasOwnProperty('max_percent')) {
                    formattedString += ", ";
                }
            }

            if (ingredients[key].hasOwnProperty('max_percent')) {
                formattedString += `max: ${ingredients[key].max_percent}`;
            }

            formattedString += ")";
        }

        if (index < array.length - 1) {
            formattedString += ", ";
        }
    });

    return formattedString;
}

  return (
    <div>
      <h2>Your Selections</h2>
      <h3>Skincare Goals/Concerns:</h3>
      <ul>
        {goalsData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Selected Skincare Product:</h3>
      <p>{productData}</p>

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
