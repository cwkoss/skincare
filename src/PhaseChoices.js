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
        fetchedPhaseSuggestions = await getPhaseSuggestions(state);
        setPhaseSuggestions(fetchedPhaseSuggestions);
      } catch (error) {
        console.error('Error fetching phase suggestions:', error);
      } finally {
        setIsLoading(false);
        console.log("Phase suggestions:", fetchedPhaseSuggestions);
      }
    }
    if (phaseSuggestions && phaseSuggestions.length === 0 && isLoading === false && state.currentPhase !== "emulsifier") {
      setIsLoading(true);
      fetchPhaseSuggestions();
    }
  }, [state]);

  const getNextPhase = () => {
    const currentIndex = state.phaseOrder.indexOf(state.currentPhase);
    if (state.phaseOrder.length === currentIndex + 1) {
      alert("done");  // TODO - handle completion
    }
    return state.phaseOrder[currentIndex + 1] || null;
  };

  const goToNextPhase = () => {
    const nextPhase = getNextPhase();
    if (nextPhase) {
      dispatch({ type: "SET_CURRENT_PHASE", payload: nextPhase });
    }
    // phase suggestion removal will be changed when we load multiple phases of suggestions and hold onto them all
    setPhaseSuggestions([]);
  };

  const handlePhaseSelection = (phase) => {
    dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        phase: state.currentPhase,
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

  if (state.currentPhase === "emulsifier") {
    const lotionFormula = {
      title: 'Lotion',
      ingredients: {
        aqueous: '60%',
        carrier: '34%',
        cetearyl_alcohol: '6%',
      },
      description: 'A lightweight formulation ideal for normal to oily skin types.'
    };

    const creamFormula = {
      title: 'Cream',
      ingredients: {
        aqueous: '35%',
        carrier: '57%',
        lecithin: '4%',
        cetearyl_alcohol: '4%',
      },
      description: 'A rich formulation suitable for dry and aging skin.'
    };

    return (
      <Layout
        title={"Choose Your " + state.currentPhase + " Phase"}
        handleSubmit={() => { goToNextPhase() }}>
        <div>
          <h2>Choose Formula Consistency</h2>
          <div>
            <h3>{lotionFormula.title}</h3>
            <p>Ingredients: {Object.entries(lotionFormula.ingredients).map(([key, value]) => `${key} ${value}`).join(', ')}</p>
            <p>Description: {lotionFormula.description}</p>
            <button onClick={() => handlePhaseSelection(lotionFormula)}>Choose {lotionFormula.title}</button>
          </div>
          <div>
            <h3>{creamFormula.title}</h3>
            <p>Ingredients: {Object.entries(creamFormula.ingredients).map(([key, value]) => `${key} ${value}`).join(', ')}</p>
            <p>Description: {creamFormula.description}</p>
            <button onClick={() => handlePhaseSelection(creamFormula)}>Choose {creamFormula.title}</button>
          </div>
        </div>
      </Layout>
    )
  };

  return (
    <Layout
      title={"Choose Your " + state.currentPhase + " Phase"}
      handleSubmit={() => { goToNextPhase() }}>
      {phaseSuggestions.map((item, index) => (
        <div key={index}>
          <h2>Phase {index + 1}: {item.title}</h2>
          <p>Ingredients:  {item.ingredients ? Object.entries(item.ingredients).map(([key, value]) => `${key} ${value}`).join(', ') : 'No ingredients listed'}</p>
          <p>Description: {item.description}</p>
          <button onClick={() => handlePhaseSelection(phaseSuggestions[index])}>Choose Phase {index + 1}</button>
        </div>
      ))}
    </Layout>
  );
}

export default PhaseChoices;
