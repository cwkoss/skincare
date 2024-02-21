import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIngredientsByType } from './ingredients';
import { updateSession } from './sessionUtils';
import Layout from './Layout';

/*
This file will replae RecipeBuilder.  Instead of building the whole recipe, 
users will customize each phase and then have a final step where they adjust the proportions between the phases.  

*/

function PhaseSelection() {
const [currentPhase, setCurrentPhase] = useState("carrier");
const phaseOrder = []; ///TODO get phase order from productData
const [mode, setMode] = useState("review"); // review, ingredientSelection, and proporitonSelection


    return (
        <Layout title="Your Selections"
                handleSubmit={handleAIClick}
                buttonText="Generate a Formulation with AI"
                isSubmitDisabled={loading}
                whyDisabled="Loading...">
    

        </Layout>
      );
}

export default PhaseSelection;