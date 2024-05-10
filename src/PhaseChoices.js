import React, { useState, useEffect } from 'react';
import Layout from './Layout'; // Ensure this path is correct
import { useRecipe } from './RecipeContext';

function PhaseChoices() {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useRecipe();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getNextPhase = () => {
    const currentIndex = state.phaseOrder.indexOf(state.currentPhase);
    return state.phaseOrder[currentIndex + 1] || null;
  };

  const goToNextPhase = () => {
    const nextPhase = getNextPhase();
    if (nextPhase) {
      dispatch({ type: "SET_CURRENT_PHASE", payload: nextPhase });
    }
  };

  const handlePhaseSelection = (phase) => {
    dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        phase: "carrier",
        data: {
          "Jojoba Oil": 10,
          "Sunflower Oil": 5,
          "Shea Butter": 8,
          "commentary": "Updated commentary for carrier oils."
        }
      }
    });
    console.log(state);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="loading-container">
          <div className="loader"></div>
        </div>
        Loading...
      </div>
    );
  }

  return (
    <Layout 
      title={"Choose Your " + state.currentPhase + " Phase"}
      handleSubmit={goToNextPhase} >
      <div>
        <h2>Phase 1: Light Oils</h2>
        <p>Ingredients: Coconut Oil, Jojoba Oil</p>
        <p>Description: Best for oily skin types, absorbs quickly without leaving a residue.</p>
        <button onClick={() => handlePhaseSelection('carrier')}>Choose Phase 1</button>
      </div>
      <div>
        <h2>Phase 2: Medium Oils</h2>
        <p>Ingredients: Almond Oil, Argan Oil</p>
        <p>Description: A balanced blend that works for most skin types, providing hydration without heaviness.</p>
        <button>Choose Phase 2</button>
      </div>
      <div>
        <h2>Phase 3: Heavy Oils</h2>
        <p>Ingredients: Olive Oil, Shea Butter</p>
        <p>Description: Ideal for dry or mature skin, offering deep moisturization and protective benefits.</p>
        <button>Choose Phase 3</button>
      </div>
    </Layout>
  );
}

export default PhaseChoices;
