import React from 'react';
import ingredientsRef from './ingredients';

function PhaseDetails({ phaseData }) {
    // Destructure to separate commentary from the rest of the ingredients
    const { commentary, ...ingredients } = phaseData;

    return (
        <div>
            <h4>Ingredients</h4>
            <ul>
                {Object.entries(ingredients).map(([ingredient, detail]) => (
                    <li key={ingredient}>
                        <strong>{ingredient}</strong>: {detail} Parts
                        <p>{ingredientsRef[ingredient].description}</p>
                    </li>
                ))}
            </ul>
            <h4>Commentary</h4>
            <p>{commentary}</p>
        </div>
    );
}

export default PhaseDetails;
