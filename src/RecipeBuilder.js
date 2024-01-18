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
            setIngredientProportions({ ...ingredientProportions, [ingredientName]: ingredients[ingredientName].phase === "additive" ? ingredients[ingredientName].default_percent : 10 });
        }
    };

    const redistributeProportions = (adjustedIngredient, adjustedValue) => {
        const totalAdditiveProportion = Object.keys(ingredientProportions)
            .filter(name => isAdditive(name) && name !== adjustedIngredient)
            .reduce((acc, name) => acc + ingredientProportions[name], 0);

        const remainingProportion = 100 - totalAdditiveProportion - adjustedValue;
        const nonAdditiveIngredients = selectedIngredients.filter(name => !isAdditive(name) && name !== adjustedIngredient);
        const totalNonAdditiveProportion = nonAdditiveIngredients.reduce((acc, name) => acc + ingredientProportions[name], 0);

        const scaleFactor = totalNonAdditiveProportion === 0 ? 0 : remainingProportion / totalNonAdditiveProportion;

        const newProportions = { ...ingredientProportions };
        nonAdditiveIngredients.forEach(name => {
            newProportions[name] = ingredientProportions[name] * scaleFactor;
        });
        if (adjustedIngredient !== "null") {
            newProportions[adjustedIngredient] = adjustedValue;
        }

        setIngredientProportions(newProportions);
    };



    const handleSliderChange = (ingredientName, value) => {
        const newValue = parseFloat(value);
        redistributeProportions(ingredientName, newValue);
    };
    const [temporaryInputs, setTemporaryInputs] = useState({});

    const handleAdditiveChange = (ingredientName, value) => {
        // Update the temporary input state
        setTemporaryInputs({ ...temporaryInputs, [ingredientName]: value });
        // If the value is a valid complete number, update the proportions immediately
        const newValue = parseFloat(value);
        const maxPercent = ingredients[ingredientName].max_percent || 100; // Default to 100 if not specified
        if (!isNaN(newValue) && value.match(/^\d+(\.\d+)?$/)) {
            const boundedValue = newValue > maxPercent ? maxPercent : newValue;
            const newProportions = { ...ingredientProportions, [ingredientName]: boundedValue };
            setIngredientProportions(newProportions);
            redistributeProportions(ingredientName, newValue);
        }
    };

    const handleAdditiveBlur = (ingredientName) => {
        const value = temporaryInputs[ingredientName];
        const newValue = value ? parseFloat(value) : 0;
        const maxPercent = ingredients[ingredientName].max_percent || 100; // Default to 100 if not specified
        const boundedValue = newValue > maxPercent ? maxPercent : newValue;
        if (!isNaN(boundedValue)) {
          // Update the real proportions and redistribute
          const newProportions = { ...ingredientProportions, [ingredientName]: boundedValue };
          setIngredientProportions(newProportions);
          redistributeProportions(ingredientName, boundedValue);
          if(newValue > maxPercent) {
            // Update the temporary input state
            setTemporaryInputs({ ...temporaryInputs, [ingredientName]: maxPercent });
          }
        }
      };



    const isIngredientSelected = (ingredientName) => {
        return selectedIngredients.includes(ingredientName);
    };

    const isAdditive = (ingredientName) => {
        const ingredient = ingredients[ingredientName];
        return ingredient ? ingredient.phase === "additive" : false;
    };

    const roundProportions = () => {
        const newProportions = { ...ingredientProportions };
        let roundedTotal = 0;

        // Round each proportion
        Object.keys(newProportions).forEach(key => {
            // only round if the ingredient is not phase additive
            if (!isAdditive(key)) {
                newProportions[key] = Math.round(newProportions[key]);
            }
            roundedTotal += newProportions[key];
        });

        // Adjust if the rounded total is not 100%
        if (roundedTotal !== 100) {
            const adjustment = roundedTotal > 100 ? -1 : 1;
            for (const key in newProportions) {
                if (newProportions[key] > 0) {
                    newProportions[key] += adjustment;
                    if (roundedTotal + adjustment === 100) break;
                }
            }
        }

        setIngredientProportions(newProportions);
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            roundProportions();
        }, 10); // Delay of 100 milliseconds
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

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
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

            <div style={headerStyle}>
                <h3>Selected Ingredients:</h3>
            </div>
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
                                        <div style={{ position: 'relative' }}>
                                        <input
                                          type="text"
                                          value={temporaryInputs[name] ?? ingredientProportions[name]}
                                          onChange={(e) => handleAdditiveChange(name, e.target.value)}
                                          onBlur={(e) => handleAdditiveBlur(name, e.target.value)}
                                          style={{ width: '100%', borderColor: ingredientProportions[name] === ingredients[name].max_percent ? 'red' : 'initial' }}
                                        />
                                        {ingredientProportions[name] === ingredients[name].max_percent && (
                                          <span style={{ position: 'absolute', right: 0, top: 0, color: 'red' }}>Max</span>
                                        )}
                                      </div>
                                    ) : (
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={ingredientProportions[name]}
                                            onChange={(e) => handleSliderChange(name, e.target.value)}
                                            onMouseUp={handleMouseUp}
                                            onTouchEnd={handleMouseUp}
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
