import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from './RecipeContext';
import { set } from 'firebase/database';
import { getPhaseSuggestions } from './OpenAiUtils';
import ingredients from './ingredients';

const phaseDescriptions = {
 "carrier": "The oil phase provides a base for the formulation, delivering hydration and nourishment to the skin while helping to dilute and spread active ingredients evenly.",
 "aqueous": "The aqueous phase is responsible for hydrating the skin and delivering water-soluble ingredients, forming the foundation of emulsions and adding moisture to the formulation.",
"active":  "The active phase contains potent ingredients that target specific skin concerns, such as anti-aging, brightening, or soothing, providing the primary therapeutic benefits of the product.",
"fragrance": "The fragrance phase enhances the sensory experience of the product by adding pleasant scents, which can also have therapeutic properties, contributing to the overall appeal and enjoyment of the skincare routine.",
"preservative": "The preservative phase ensures the stability and safety of the product by preventing the growth of bacteria, mold, and other microorganisms, thereby extending the shelf life of the formulation."
};

function PhaseChoices() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useRecipe();
  const [phaseSuggestions, setPhaseSuggestions] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);

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
      navigate('/confirm-recipe');
    }
    return state.phaseOrder[currentIndex + 1] || null;
  };

  const goToNextPhase = () => {
    setSelectedPhase(null);
    const nextPhase = getNextPhase();
    if (nextPhase) {
      dispatch({ type: "SET_CURRENT_PHASE", payload: nextPhase });
    }
    // phase suggestion removal will be changed when we load multiple phases of suggestions and hold onto them all
    setPhaseSuggestions([]);
  };

  const handlePhaseSelection = (phase) => {
    setSelectedPhase(phase.title);
    dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        phase: state.currentPhase,
        data: phase
      }
    });
    console.log(state);
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const renderExpandedIngredient = (key, value) => {
    return (
      <>
        <p className='expanded-ingredient'>{key}: {value} Parts</p>
        <p className='ingredient-description'>{ingredients[key].description}</p>
      </>
    );
  };
  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="loading-container">
          <div className="loader"></div>
        </div>
        Loading... <br />
        <div style={{ width:  "80dvw"}}>{phaseDescriptions[state.currentPhase]}</div>
      </div>
    );
  }

  if (state.currentPhase === "emulsifier") {
    const lotionFormula = {
      title: 'Lotion',
      ingredients: {
        aqueous: '60%',
        oil: '34%',
        "Cetearyl Alcohol": '6%',
      },
      description: 'A lightweight formulation ideal for normal to oily skin types.'
    };

    const creamFormula = {
      title: 'Cream',
      ingredients: {
        aqueous: '35%',
        oil: '57%',
        "Lecithin": '4%',
        "Cetearyl Alcohol": '4%',
      },
      description: 'A rich formulation suitable for dry and aging skin.'
    };

    return (
      <Layout
        title={"Choose Formula Consistency"}
        handleSubmit={() => { goToNextPhase() }}
        isSubmitDisabled={selectedPhase === null}
        whyDisabled="Choose Consistency">
        <div>
          <div style={selectedPhase === lotionFormula.title ? { border: '2px solid blue', padding: '10px' } : {}}>
            <h4>{lotionFormula.title}</h4>
            <p>Ingredients: {Object.entries(lotionFormula.ingredients).map(([key, value]) => `${key} ${value}`).join(', ')}</p>
            <p>Description: {lotionFormula.description}</p>
            <button onClick={() => handlePhaseSelection(lotionFormula)}>Choose {lotionFormula.title}</button>
          </div>
          <div style={selectedPhase === creamFormula.title ? { border: '2px solid blue', padding: '10px' } : {}}>
            <h4>{creamFormula.title}</h4>
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
      title={"Choose Your " + capitalizeFirstLetter(state.currentPhase) + " Phase"}
      handleSubmit={() => { goToNextPhase() }}
      isSubmitDisabled={selectedPhase === null}
      whyDisabled="Choose an option">
      {phaseSuggestions.map((item, index) => (
        <div key={index} className={selectedPhase === item.title ? 'selected-phase' : ''} onClick={() => handlePhaseSelection(item)}>
          <h2>Phase {index + 1}: {item.title}</h2>
          {selectedPhase === item.title ? (
            <>
              <p className="description">{item.description}</p>
              <p>Ingredients: {item.ingredients ? Object.entries(item.ingredients).map(([key, value]) => renderExpandedIngredient(key, value)) : 'No ingredients listed'}</p>
            </>
          ) : (
            <p>Ingredients: {item.ingredients ? Object.entries(item.ingredients).map(([key, value]) => `${key}`).join(', ') : 'No ingredients listed'}</p>
          )}
          <button className={selectedPhase === item.title ? 'selected' : ''}>Choose Phase {index + 1}</button>
        </div>
      ))}
    </Layout>
  );
}

export default PhaseChoices;
