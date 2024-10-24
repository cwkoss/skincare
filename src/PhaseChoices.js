import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from './RecipeContext';
import { set } from 'firebase/database';
import { getPhaseSuggestions } from './OpenAiUtils';
import ingredients from './ingredients';
import ScrollContainer from './ScrollContainer';

const phaseDescriptions = {
  "carrier": "The oil phase provides a base for the formulation, delivering hydration and nourishment to the skin while helping to dilute and spread active ingredients evenly.",
  "aqueous": "The aqueous phase is responsible for hydrating the skin and delivering water-soluble ingredients, forming the foundation of emulsions and adding moisture to the formulation.",
  "active": "The active phase contains potent ingredients that target specific skin concerns, such as anti-aging, brightening, or soothing, providing the primary therapeutic benefits of the product.",
  "fragrance": "The fragrance phase enhances the sensory experience of the product by adding pleasant scents, which can also have therapeutic properties, contributing to the overall appeal and enjoyment of the skincare routine.",
  "preservative": "The preservative phase ensures the stability and safety of the product by preventing the growth of bacteria, mold, and other microorganisms, thereby extending the shelf life of the formulation."
};

function PhaseChoices() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [wantSomethingElse, setWantSomethingElse] = useState(false);
  const { state, dispatch } = useRecipe();
  const [phaseSuggestions, setPhaseSuggestions] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const itemRefs = useRef([]); // Add refs to scroll into view
  const [somethingElseText, setSomethingElseText] = useState('');

  const emulsifierOptions = [
    {
      title: 'Lotion',
      ingredients: {
        aqueous: '60%',
        oil: '34%',
        "Cetearyl Alcohol": '6%',
      },
      description: 'A lightweight formulation ideal for normal to oily skin types.'
    },
    {
      title: 'Cream',
      ingredients: {
        aqueous: '35%',
        oil: '57%',
        "Lecithin": '4%',
        "Cetearyl Alcohol": '4%',
      },
      description: 'A rich formulation suitable for dry and aging skin.'
    }
  ];


  const fetchPhaseSuggestions = async () => {
    let fetchedPhaseSuggestions = "dummy";
    try {
      // Assuming that getPhaseSuggestions properly handles the 'phase' and 'state'
      fetchedPhaseSuggestions = await getPhaseSuggestions(state, somethingElseText);
      setPhaseSuggestions(fetchedPhaseSuggestions);
    } catch (error) {
      console.error('Error fetching phase suggestions:', error);
    } finally {
      setIsLoading(false);
      console.log("Phase suggestions:", fetchedPhaseSuggestions);
    }
  };

  useEffect(() => {

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

  const handlePhaseSelection = (phase, index) => {
    setSelectedPhase(phase.title);
    dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        phase: state.currentPhase,
        data: phase
      }
    });
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
    console.log(state);
  };

  const requestSomethingElse = () => {
    setWantSomethingElse(false);
    setIsLoading(true);
    fetchPhaseSuggestions();
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const renderPhaseChoices = () => {
    const options = state.currentPhase === "emulsifier" ? emulsifierOptions : phaseSuggestions;

    return (
      <div className="scroll-container">
        <ScrollContainer
          items={options}
          handleSelection={handlePhaseSelection}
          selectedItem={selectedPhase}
          itemRefs={itemRefs}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p className="loading-text">Loading...</p>
        <p className="phase-description">{phaseDescriptions[state.currentPhase]}</p>
      </div>
    );
  }



return (
  <Layout
    title={state.currentPhase === "emulsifier" ? "Choose Formula Consistency" : `Choose Your ${capitalizeFirstLetter(state.currentPhase)}`}
    handleSubmit={goToNextPhase}
    isSubmitDisabled={selectedPhase === null}
    whyDisabled={state.currentPhase === "emulsifier" ? "Choose Consistency" : "Choose an option"}
  >
    {wantSomethingElse ? (

      <Layout
        title="Request Something Else"
        handleSubmit={() => { requestSomethingElse() }}
        buttonText="Get New Suggestions"
        isSubmitDisabled={false}
        whyDisabled="Choose Consistency">
        <p>Tell the AI what you're looking for and we'll generate new options closer to what you want!</p>
        <textarea
          className="big-text-area"
          placeholder="Enter your request.  Are there specific ingredients you want to use?  Are there specific skin concerns you want to address?  The more detail you provide, the better the AI can help you!"
          onChange={(e) => setSomethingElseText(e.target.value)}
          value={somethingElseText}
        />
      </Layout>

    ) : (
      <>
        {renderPhaseChoices()}
        <p className="something-else"><a onClick={() => setWantSomethingElse(true)}>Looking for something else?</a></p>
      </>
    )}
  </Layout>
);
}

export default PhaseChoices;
