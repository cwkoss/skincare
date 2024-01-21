import React, { useState, useEffect } from 'react';
import ingredients from './ingredients';
import { useLocation } from 'react-router-dom';


function RecipeBuilder() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientProportions, setIngredientProportions] = useState({});
    const [currentStep, setCurrentStep] = useState('selectIngredients');
    const [recipeCommentary, setRecipeCommentary] = useState('');
    const [shelfLifeEstimate, setShelfLifeEstimate] = useState('');
    
    const location = useLocation();
    const initialRecipe = location.state?.recipe;
    console.log(location.state);

    console.log("initialRecipe", initialRecipe);



    // Function to move to the proportion adjustment step
    const goToProportionAdjustment = () => {
        setCurrentStep('adjustProportions');
    };

    // Function to go back to ingredient selection
    const goBackToSelectIngredients = () => {
        setCurrentStep('selectIngredients');
    };

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
            .filter(name => isAdditive(name))
            .reduce((acc, name) => acc + ingredientProportions[name], 0);

        let remainingProportion = 100 - totalAdditiveProportion;
        const nonAdditiveIngredients = selectedIngredients.filter(name => !isAdditive(name));

        // First, set the adjusted ingredient's value and subtract it from the remaining proportion
        const newProportions = { ...ingredientProportions, [adjustedIngredient]: adjustedValue };
        remainingProportion -= adjustedValue;

        // Then, distribute the remaining proportion among the other non-additive ingredients
        const totalCurrentNonAdditive = nonAdditiveIngredients
            .filter(name => name !== adjustedIngredient)
            .reduce((acc, name) => acc + newProportions[name], 0);

        // Prevent negative values during redistribution
        if (totalCurrentNonAdditive > 0) {
            const scaleFactor = remainingProportion / totalCurrentNonAdditive;
            nonAdditiveIngredients.forEach(name => {
                if (name !== adjustedIngredient) {
                    let adjustedProportion = newProportions[name] * scaleFactor;
                    newProportions[name] = adjustedProportion < 0 ? 0 : adjustedProportion;
                }
            });
        } else {
            // If there are no other non-additives, set their proportions to 0
            nonAdditiveIngredients.forEach(name => {
                if (name !== adjustedIngredient) {
                    newProportions[name] = 0;
                }
            });
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
            if (newValue > maxPercent) {
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

        // Round each non-additive proportion
        Object.keys(newProportions).forEach(key => {
            if (!isAdditive(key)) {
                newProportions[key] = Math.round(newProportions[key]);
            }
            roundedTotal += newProportions[key];
        });

        // Calculate discrepancy and adjust non-additive proportions
        const discrepancy = 100 - roundedTotal;
        const nonAdditiveKeys = Object.keys(newProportions).filter(key => !isAdditive(key));
        const adjustmentPerIngredient = discrepancy / nonAdditiveKeys.length;

        nonAdditiveKeys.forEach(key => {
            newProportions[key] += adjustmentPerIngredient;
        });

        // Handle negative proportions
        let negativeSum = 0;
        nonAdditiveKeys.forEach(key => {
            if (newProportions[key] < 0) {
                negativeSum += newProportions[key];
                newProportions[key] = 0;
            }
        });

        // Redistribute the negative sum among positive non-additive ingredients
        if (negativeSum < 0) {
            const positiveKeys = nonAdditiveKeys.filter(key => newProportions[key] >= 0.01);
            const positiveAdjustment = Math.abs(negativeSum) / positiveKeys.length;

            positiveKeys.forEach(key => {
                newProportions[key] += positiveAdjustment;
            });
        }

        // Final check if total exceeds 100%
        const finalTotal = Object.values(newProportions).reduce((acc, val) => acc + val, 0);
        if (finalTotal > 100) {
            const excess = finalTotal - 100;
            const positiveKeys = nonAdditiveKeys.filter(key => newProportions[key] > 0);
            const excessAdjustment = excess / positiveKeys.length;

            positiveKeys.forEach(key => {
                newProportions[key] -= excessAdjustment;
            });
        }

        setIngredientProportions(newProportions);
    };

    const getRecipeAdvice = () => {
        console.log("boop");
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            roundProportions();
        }, 10); // Delay of 100 milliseconds
    };

    const calculateTotalPercentage = () => {
        return Object.values(ingredientProportions).reduce((acc, value) => acc + value, 0);
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

    const headerWithButtonStyle = {
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

    const totalPercentage = calculateTotalPercentage();
    const totalPercentageStyle = {
        color: Math.abs(totalPercentage - 100) < 0.01 ? 'black' : 'red',
    };
    
    useEffect(() => {
        console.log("useeffectinitialRecipe", initialRecipe);
        if (initialRecipe) {
            const ingredientsFromResponse = {};
            const selectedIngredientsFromResponse = [];
    
            Object.keys(initialRecipe).forEach(key => {
                if (key === "commentary") {
                    setRecipeCommentary(initialRecipe["commentary"]);
                }
                else if (key === "shelfLifeEstimate") {
                    setShelfLifeEstimate(initialRecipe["shelfLifeEstimate"]);
                }
                else if ( ingredients[key]) {
                    ingredientsFromResponse[key] = initialRecipe[key];
                    selectedIngredientsFromResponse.push(key);
                } 
            });
            console.log("ingredientsfromresponse", ingredientsFromResponse);
            setIngredientProportions(ingredientsFromResponse);
            setSelectedIngredients(selectedIngredientsFromResponse);

            goToProportionAdjustment();
        }
    }, [initialRecipe]);

    return (
        <div>
            {currentStep === 'selectIngredients' && (
                <div>
                    <div>
                        <div style={headerWithButtonStyle}>
                            <h3>Available Ingredients:</h3>
                            <button onClick={goToProportionAdjustment}>Adjust Proportions</button>
                            <span></span>
                        </div>
                        {Object.entries(ingredients).map(([name, details]) => (
                            <div className={ (isIngredientSelected(name) ? 'selected' : '') + " ingredient-row"}
                                key={name}
                                onClick={() => handleIngredientSelect(name)}
                            >
                                <strong>{name}</strong>
                                <small>{details.description}</small>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {currentStep === 'adjustProportions' && (
                <div>

                    <div style={headerStyle}>
                        <button onClick={goBackToSelectIngredients}>Back to Ingredients</button>
                        <h3>Proportions:</h3>
                        <span style={totalPercentageStyle} onClick={roundProportions}>{totalPercentage.toFixed(2)}%</span>
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
                    {recipeCommentary && (
                        <div>
                            <div style={headerWithButtonStyle}>
                                <h3>Commentary:</h3>
                                <button onClick={getRecipeAdvice}>Get Recipe Advice (Coming Soon!)</button>
                            </div>
                            <p>{recipeCommentary}</p>
                            <p>Estimated Shelf Life: {shelfLifeEstimate}</p>
                        </div>
                    )}
                </div>
            )}



        </div>
    );
}

export default RecipeBuilder;
