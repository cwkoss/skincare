import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import ingredients, { getIngredientsByType } from './ingredients';

//import { updateSession } from './sessionUtils';
import Layout from './Layout';
import { skincareProducts } from './Product';

/*
This file will replace RecipeBuilder.  Instead of building the whole recipe, 
users will customize each phase and then have a final step where they adjust the proportions between the phases.  

*/
const mockedRecipe = {
    "carrier": {
        "Jojoba Oil": 5,
        "Sunflower Oil": 5,
        "Shea Butter": 5,
        "commentary": "Carrier oils serve as the base for the recipe, helping to dilute other concentrated ingredients. Jojoba Oil is chosen for its similarity to skin's natural oils, offering moisturizing properties. Sunflower Oil is rich in Vitamin E, promoting skin health. Shea Butter is included for its deep moisturizing and skin nourishing benefits."

    },
    "aqueous": {
        "Aloe Vera Gel": 5,
        "Distilled Water": 5,
        "commentary": "The aqueous phase adds water-based ingredients to the recipe, ensuring hydration. Aloe Vera is renowned for its soothing and healing properties, making it ideal for sensitive skin. Distilled Water serves as a pure, clean base, helping to blend the ingredients effectively."
    },
    "emulsifier": {
        "Cetearyl Alcohol": 5,
        "commentary": "Emulsifiers are crucial for combining oil and water-based ingredients into a stable mixture. Cetaryl Alcohol, a fatty alcohol, is gentle on the skin and helps to create a creamy texture in the final product."
    },
    "active": {
        "Niacinamide": 2,
        "commentary": "Active ingredients target specific skin concerns. Niacinamide is chosen for its versatility; it helps to improve skin texture, brighten the complexion, and strengthen the skin barrier."
    },
    "fragrance": {
        "Lavender Oil": 1,
        "Germanium Oil": 1,
        "commentary": "Essential oils provide the product with natural fragrances and therapeutic benefits. Lavender Oil offers calming properties, making it ideal for use in skincare. Germanium Oil is known for its ability to reduce the appearance of wrinkles and fine lines, promoting a youthful glow."
    },
    "preservative": {
        "AntiMicro Banana": 2,
        "commentary": "Preservatives ensure the longevity and safety of the skincare product by preventing microbial growth. AntiMicro Banana is a natural preservative option, offering effective protection against a broad spectrum of microbes."
    }

}


function PhaseSelection() {
    const [currentPhase, setCurrentPhase] = useState("carrier");
    const phaseOrder = skincareProducts["Daytime Face Moisturizing Cream with SPF"].typeOrder; ///TODO get phase order from productData
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [recipe, setRecipe] = useState(mockedRecipe);
    const [mode, setMode] = useState("review"); // review, ingredientSelection, and proporitonSelection

    const handleSubmit = () => {
        setMode("review");
        const nextIndex = phaseOrder.indexOf(currentPhase) + 1;
        if (nextIndex < phaseOrder.length) {
            setCurrentPhase(phaseOrder[nextIndex]);
        } else {
            // Handle final submission or review
        }
    };

    const renderPhaseDetails = (phase) => {
        const { commentary, ...recipeIngredients } = phase;
        return (
            <>
                <h4>Ingredients</h4>
                <ul>
                    {Object.entries(recipeIngredients).map(([ingredient, amount]) => (
                        <li key={ingredient}>
                            {ingredient}: {amount} <br />
                            {ingredients[ingredient] ? ingredients[ingredient].description : 'Description not available'}
                        </li>
                    ))}
                </ul>
                <h4>Commentary</h4>
                <p>{commentary}</p>
            </>
        );
    };

    const handleIngredientSelect = (ingredientName) => {
        // Toggle selection in the selectedIngredients state directly
        setSelectedIngredients(prev => ({
            ...prev,
            [ingredientName]: !prev[ingredientName]
        }));

        // Add or remove ingredient from recipe based on the new selected state
        if (selectedIngredients[ingredientName]) {
            // If ingredient was selected, remove it from recipe
            const { [ingredientName]: removed, ...rest } = recipe[currentPhase];
            setRecipe({ ...recipe, [currentPhase]: rest });
        } else {
            // If ingredient was not selected, add it back with a default amount
            const newAmount = 1; // Default amount, adjust as needed
            const ingredientDetail = ingredients[ingredientName] || {}; // Fallback to an empty object if not found
            setRecipe(prev => ({
                ...prev,
                [currentPhase]: {
                    ...prev[currentPhase],
                    [ingredientName]: { amount: newAmount, ...ingredientDetail }
                }
            }));
        }
    };


    // Function to update selectedIngredients based on the current phase's ingredients in the recipe
    const updateSelectedIngredients = () => {
        const currentIngredients = recipe[currentPhase];
        const ingredientSelection = Object.keys(currentIngredients)
            .filter(key => key !== 'commentary') // Exclude 'commentary'
            .reduce((acc, ingredient) => {
                acc[ingredient] = true; // Assume all existing ingredients are selected
                return acc;
            }, {});

        setSelectedIngredients(ingredientSelection);
    };

    useEffect(() => {
        updateSelectedIngredients();
    }, [currentPhase, recipe, mode]); // Now it also updates when recipe or mode changes

    useEffect(() => {
        // Function to initialize selectedIngredients based on the current phase's ingredients
        const initializeSelectedIngredients = () => {
            const phaseIngredients = mockedRecipe[currentPhase];
            const initialSelection = Object.keys(phaseIngredients).reduce((acc, ingredient) => {
                if (ingredient !== 'commentary') { // Ensure commentary is not included as an ingredient
                    acc[ingredient] = true; // Set true to indicate selection
                }
                return acc;
            }, {});

            setSelectedIngredients(initialSelection);
        };

        initializeSelectedIngredients();
    }, [currentPhase]); // Re-run when the current phase changes

    const isIngredientSelected = (phase, ingredient) => {
        return recipe[phase] && recipe[phase].hasOwnProperty(ingredient);
    };

    // Use this function to adjust proportions, similar logic to handleIngredientSelect
    const adjustProportions = (phase, ingredientName, newAmount) => {
        if (recipe[phase] && recipe[phase][ingredientName]) {
            setRecipe(prev => ({
                ...prev,
                [phase]: {
                    ...prev[phase],
                    [ingredientName]: {
                        ...prev[phase][ingredientName],
                        amount: newAmount
                    }
                }
            }));
        }
    };

    const goToProportionAdjustment = () => {
        setMode("changeProportions");
    };

    const headerWithButtonStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const renderChangeIngredientsMode = () => (
        <div>
            <div>
                <div style={headerWithButtonStyle}>
                    <h3>Available Ingredients:</h3>
                    <button onClick={goToProportionAdjustment}>Adjust Proportions</button>
                </div>
                {Object.entries(getIngredientsByType(currentPhase)).map(([name, details]) => (
                    <div className={(selectedIngredients[name] ? 'selected' : '') + " ingredient-row"}
                        key={name}
                        onClick={() => handleIngredientSelect(name)}>
                        <strong>{name}</strong>: <small>{details.description}</small>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAdjustProportions = (phase) => {
        const phaseIngredients = recipe[phase];
        // Exclude commentary when rendering ingredient sliders
        const { commentary, ...ingredients } = phaseIngredients;

        console.log(phaseIngredients);

        return (
            <div className="recipe-builder-container">
                <h3>Adjust Proportions for {phase} Phase</h3>
                <div className="scrollable-content">
                    {Object.entries(ingredients).map(([name, value]) => (
                        <div key={name} className="ingredient-slider">
                            <label>
                                {name}: {value.toFixed(2)}%
                                <input
                                    type="range"
                                    min="0"
                                    max="100" // You might want a different max based on your application's logic
                                    value={value}
                                    onChange={(e) => handleProportionChange(phase, name, e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <button onClick={() => setMode("review")}>Back to Review</button>
            </div>
        );
    };

    const handleProportionChange = (phase, ingredientName, newValue) => {
        const newAmount = parseFloat(newValue);
        const updatedRecipe = { ...recipe };
        updatedRecipe[phase][ingredientName] = newAmount;

        setRecipe(updatedRecipe);
    };


    return (
        <Layout title="Your Selections"
            handleSubmit={handleSubmit}
            buttonText="Save and Continue"
        >
            <h3>Current Phase: {currentPhase}</h3>
            {mode === "review" &&
                <div>
                    {renderPhaseDetails(recipe[currentPhase])}
                    <button onClick={() => setMode("changeIngredients")}>Change Ingredients</button>
                    <button onClick={() => setMode("changeProportions")}>Change Proportions</button>
                </div>
            }

            {mode === "changeIngredients" && renderChangeIngredientsMode()}
            {mode === "changeProportions" && renderAdjustProportions(currentPhase)}
        </Layout>
    );
}

export default PhaseSelection;