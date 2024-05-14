import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';
import { set } from 'firebase/database';
import { getPhaseSuggestions } from './OpenAiUtils';

function PhaseChoices() {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useRecipe();
  const [phaseSuggestions, setPhaseSuggestions] = useState([]);

  useEffect(() => {
    async function fetchPhaseSuggestions() {
      let fetchedPhaseSuggestions = "dummy";
      try {
        // Assuming that getPhaseSuggestions properly handles the 'phase' and 'state'
        fetchedPhaseSuggestions = await getPhaseSuggestions("carrier", state);
        setPhaseSuggestions(fetchedPhaseSuggestions);
      } catch (error) {
        console.error('Error fetching phase suggestions:', error);
      } finally {
        setIsLoading(false);
        console.log("Phase suggestions:", fetchedPhaseSuggestions);
      }
    }
    if (phaseSuggestions && phaseSuggestions.length === 0 && isLoading === false) {
      setIsLoading(true);
      fetchPhaseSuggestions();
    }
  }, [state]);

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
        data: phase
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
      handleSubmit={() => { /* handle submission logic */ }}>
      {phaseSuggestions.map((item, index) => (
        <div key={index}>
          <h2>Phase {index + 1}: {item.title}</h2>
          <p>Ingredients: {Object.entries(item.ingredients).map(([key, value]) => `${key} ${value}`).join(', ')}</p>
          <p>Description: {item.description}</p>
          <button onClick={() => handlePhaseSelection(phaseSuggestions[index])}>Choose Phase {index + 1}</button>
        </div>
      ))}
    </Layout>
  );
}

export default PhaseChoices;
