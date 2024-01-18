import React, { useState, useEffect } from 'react';
import ingredients from './ingredients';

function RecipeBuilder() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientProportions, setIngredientProportions] = useState({});
  const [showIngredientsList, setShowIngredientsList] = useState(false);

  const handleIngredientSelect = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(selectedIngredients.filter(name => name !== ingredientName));
      const newProportions = { ...ingredientProportions };
      delete newProportions[ingredientName];
      setIngredientProportions(newProportions);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
      setIngredientProportions({ ...ingredientProportions, [ingredientName]: 0 });
    }
  };

  const handleSliderChange = (ingredientName, value) => {
    const total = Object.values(ingredientProportions).reduce((acc, cur) => acc + cur, 0) - ingredientProportions[ingredientName];
    if (total + Number(value) > 100) {
      // Adjust other proportions if total exceeds 100%
      const scale = (100 - Number(value)) / total;
      for (const key in ingredientProportions) {
        if (key !== ingredientName) {
          ingredientProportions[key] = Math.round(ingredientProportions[key] * scale);
        }
      }
    }
    setIngredientProportions({ ...ingredientProportions, [ingredientName]: Number(value) });
  };

  const isIngredientSelected = (ingredientName) => {
    return selectedIngredients.includes(ingredientName);
  };

  const ingredientRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const selectedStyle = {
    backgroundColor: '#e0f7fa',
  };

  useEffect(() => {
    // Initialize proportions when new ingredient is added
    if (selectedIngredients.length > 0) {
      const total = Object.values(ingredientProportions).reduce((acc, cur) => acc + cur, 0);
      const remaining = 100 - total;
      const newProportion = Math.round(remaining / selectedIngredients.length);
      const newProportions = {};
      selectedIngredients.forEach(ingredient => {
        newProportions[ingredient] = ingredientProportions[ingredient] || newProportion;
      });
      setIngredientProportions(newProportions);
    }
  }, [selectedIngredients]);

  return (
    <div>
      <h2>Recipe Builder</h2>
      <button onClick={() => setShowIngredientsList(!showIngredientsList)}>
        {showIngredientsList ? 'Hide Ingredients' : 'Choose Ingredients'}
      </button>

      {showIngredientsList && (
        <div>
          <h3>Available Ingredients:</h3>
          {Object.entries(ingredients).map(([name, details]) => (
            <div
            key={name}
            style={{ ...ingredientRowStyle, ...(isIngredientSelected(name) ? selectedStyle : {}) }}
            onClick={() => handleIngredientSelect(name)}
          >
            <strong>{name}</strong>
            <small>{details.description}</small>
          </div>
          ))}
        </div>
      )}

      <h3>Selected Ingredients:</h3>
      <table>
        <tbody>
          {selectedIngredients.map(name => (
            <React.Fragment key={name}>
              <tr>
                <td>{name}</td>
                <td>{ingredientProportions[name]}%</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={ingredientProportions[name]}
                    onChange={(e) => handleSliderChange(name, e.target.value)}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeBuilder;
