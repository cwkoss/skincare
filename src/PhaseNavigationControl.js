import React from 'react';

function PhaseNavigationControl({ currentPhase, phaseOrder, onNextPhase, onPrevPhase, setMode }) {
    const currentIndex = phaseOrder.indexOf(currentPhase);
    const isFirstPhase = currentIndex === 0;
    const isLastPhase = currentIndex === phaseOrder.length - 1;

    return (
        <div className="phase-navigation-control">
            <button
                onClick={onPrevPhase}
                disabled={isFirstPhase}
            >
                Previous Phase
            </button>
            <button
                onClick={onNextPhase}
                disabled={isLastPhase}
            >
                Next Phase
            </button>
            <button onClick={() => setMode("review")}>Review</button>
            <button onClick={() => setMode("changeIngredients")}>Change Ingredients</button>
            <button onClick={() => setMode("changeProportions")}>Adjust Proportions</button>
        </div>
    );
}

export default PhaseNavigationControl;
