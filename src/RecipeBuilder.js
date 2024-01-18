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

    const redistributeProportions = (adjustedIngredient, adjustedValue) => {
        let remainingProportion = 100 - Object.keys(ingredientProportions)
          .filter(name => isAdditive(name))
          .reduce((acc, name) => acc + parseFloat(ingredientProportions[name]), 0);
      
        const nonAdditiveIngredients = selectedIngredients.filter(name => !isAdditive(name) && name !== adjustedIngredient);
        remainingProportion -= adjustedValue;
      
        // Distribute remaining proportion among non-additive ingredients
        const newProportions = { ...ingredientProportions };
        nonAdditiveIngredients.forEach(name => {
          newProportions[name] = parseFloat((remainingProportion / nonAdditiveIngredients.length).toFixed(2));
        });
        if (adjustedIngredient !== "null") {
          newProportions[adjustedIngredient] = parseFloat(adjustedValue.toFixed(2));
        }
      
        setIngredientProportions(newProportions);
      };
      

      const handleSliderChange = (ingredientName, value) => {
        const newValue = parseFloat(value);
        redistributeProportions(ingredientName, newValue);
      };

      const handleAdditiveChange = (ingredientName, value) => {
        const newValue = parseFloat(value);
        const newProportions = { ...ingredientProportions, [ingredientName]: newValue };
        setIngredientProportions(newProportions);
        redistributeProportions(null, 0); // Call with null to not adjust the recently changed additive
      };

    const isIngredientSelected = (ingredientName) => {
        return selectedIngredients.includes(ingredientName);
    };

    const isAdditive = (ingredientName) => {
        const ingredient = ingredients[ingredientName];
        return ingredient ? ingredient.phase === "additive" : false;
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

    const tableStyle = {
        width: '95%', // Ensure the table takes full width
        borderCollapse: 'collapse',
    };


    useEffect(() => {
        const newProportions = {};
      
        // Set initial proportions for selected ingredients
        selectedIngredients.forEach(ingredient => {
          if (isAdditive(ingredient)) {
            newProportions[ingredient] = 1; // Set initial value for additive
          } else {
            newProportions[ingredient] = 10; // Set initial value for non-additive
          }
        });
      
        setIngredientProportions(prevProportions => {
          // Retain the proportions of ingredients that are still selected
          return Object.keys(prevProportions)
            .filter(key => selectedIngredients.includes(key))
            .reduce((acc, key) => {
              acc[key] = prevProportions[key];
              return acc;
            }, newProportions);
        });
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
            <table style={tableStyle}>
                <tbody>
                    {selectedIngredients.map(name => (
                        <React.Fragment key={name}>
                            <tr>
                                <td>{name}</td>
                                <td>{ingredientProportions[name].toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {isAdditive(name) ? (
                                        <input
                                            type="text"
                                            value={ingredientProportions[name]}
                                            onChange={(e) => handleAdditiveChange(name, e.target.value)}
                                            style={{ width: '100%' }}
                                        />
                                    ) : (
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={ingredientProportions[name]}
                                            onChange={(e) => handleSliderChange(name, e.target.value)}
                                            style={{ width: '100%' }}
                                        />
                                    )}
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
