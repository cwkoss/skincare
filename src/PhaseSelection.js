import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { getIngredientsByType } from './ingredients';
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
        "Aloe Vera": 5,
        "Distilled Water": 5,
        "commentary": "The aqueous phase adds water-based ingredients to the recipe, ensuring hydration. Aloe Vera is renowned for its soothing and healing properties, making it ideal for sensitive skin. Distilled Water serves as a pure, clean base, helping to blend the ingredients effectively."
    },
    "emulsifier": {
        "Cetaryl Alcohol": 5,
        "commentary": "Emulsifiers are crucial for combining oil and water-based ingredients into a stable mixture. Cetaryl Alcohol, a fatty alcohol, is gentle on the skin and helps to create a creamy texture in the final product."
    },
    "active": {
        "Niacinamide": 2,
        "commentary": "Active ingredients target specific skin concerns. Niacinamide is chosen for its versatility; it helps to improve skin texture, brighten the complexion, and strengthen the skin barrier."
    },
    "essential": {
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
//const [mode, setMode] = useState("review"); // review, ingredientSelection, and proporitonSelection


const recipe = mockedRecipe;

const handleSubmit = () => {
    setCurrentPhase(phaseOrder[phaseOrder.indexOf(currentPhase) + 1]);
};

const renderPhaseDetails = (phase) => {
    const { commentary, ...ingredients } = phase;
    return (
      <>
        <h4>Ingredients</h4>
        <ul>
          {Object.entries(ingredients).map(([ingredient, amount]) => (
            <li key={ingredient}>{ingredient}: {amount}</li>
          ))}
        </ul>
        <h4>Commentary</h4>
        <p>{commentary}</p>
      </>
    );
  };


    return (
        <Layout title="Your Selections"
                handleSubmit={handleSubmit}
                buttonText="Save and Continue"
                >
     <h3>Current Phase: {currentPhase}</h3>
      {renderPhaseDetails(recipe[currentPhase])}
        </Layout>
      );
}

export default PhaseSelection;