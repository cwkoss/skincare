import React, { useState } from 'react';

function ProportionAdjuster({ initialIngredients, updateRecipe, onSaveChanges }) {
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [isLoading, setIsLoading] = useState(false);

    const handleProportionChange = (ingredientName, newValue) => {
        const newAmount = parseFloat(newValue);
        setIngredients(prevIngredients => ({
            ...prevIngredients,
            [ingredientName]: newAmount
        }));
    };

    const handleSaveChanges = () => {
        updateRecipe(ingredients);
        onSaveChanges();
    };

    const suggestProportions = () => {
        const fetchVariations = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://us-central1-skincare-recipe-tool.cloudfunctions.net/getProportionSuggestion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phaseProportions: ingredients })
                });
                console.log('Response:', response);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('Data:', data.reply.choices[0].message.content);
                const reply = data.reply.choices[0].message.content;
            } catch (error) {
                console.error('Error fetching variations:', error);
                // Handle error state here
            } finally {
                setIsLoading(false);
            }
        };
        fetchVariations();
    };


    return (
        <div className="recipe-builder-container">
            <h3>Adjust Proportions</h3>
            <div className="scrollable-content">
                {Object.entries(ingredients).map(([name, amount]) => (
                    <div key={name}>
                        <label>
                            {name}: {amount.toFixed(0)}
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={amount}
                                onChange={(e) => handleProportionChange(name, e.target.value)}

                            />
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={suggestProportions} >Get AI Proportion Suggestion</button><br />
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
}

export default ProportionAdjuster;
