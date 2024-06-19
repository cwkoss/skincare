import React from 'react';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';

function ConfirmRecipe() {
    const { state } = useRecipe();

    const goToNextPhase = () => {
        alert("Recipe Confirmed!")
    }

    return (
        <Layout title="Confirm Your Recipe"
            buttonText="Confirm Recipe"
            handleSubmit={() => { goToNextPhase() }}>
            <div>
                {state.recipe && Object.keys(state.recipe).length > 0 ? (
                    Object.keys(state.recipe).map((phase, index) => (
                        <div key={index}>
                            <h3>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h3>
                            <p><strong>Title:</strong> {state.recipe[phase].title}</p>
                            <p><strong>Ingredients:</strong> {state.recipe[phase].ingredients ? Object.entries(state.recipe[phase].ingredients).map(([key, value]) => `${key}: ${value}`).join(', ') : 'No ingredients listed'}</p>
                            <p><strong>Description:</strong> {state.recipe[phase].description}</p>
                        </div>
                    ))
                ) : (
                    <p>No recipe data available.</p>
                )}

                debugdump
                {JSON.stringify(state.recipe)}

            </div>
        </Layout>
    );
}

export default ConfirmRecipe;
