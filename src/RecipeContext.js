import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { skincareProducts } from './Product';

// Assuming you have a utility function for Firebase operations
import { updateRecipeInFirebase } from './FirebaseUtils';
import { act } from 'react';

const RecipeContext = createContext();

const initialRecipeState = {
  recipeId: new Date().getTime().toString(), // TODO: Change to basename + generation + timestamp
  goalsData: [],
  productData: '',
  includeFragrance: 'no',
  phaseOrder: [],
  currentPhase: "",
  recipe: {},
  rawRecipe: {},
  recipeName: '', //deprecated old field
  baseName: '', // "Bob's Cool Cream"
  variationName: '', //"Lavender"
  generation: 0, 
  displayName: '',  // "Bob's Cool Cream var. Lavender (Gen 2)
  parentRecipeId: '', // if generation zero, equal to recipeId, if not, equal to parent recipeId, used to query all generations of a recipe
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return { ...state, productData: action.payload, phaseOrder: skincareProducts[action.payload].typeOrder, currentPhase: skincareProducts[action.payload].typeOrder[0] };
    case 'SET_GOALS_DATA':
      return { ...state, goalsData: action.payload };
    case 'SET_INCLUDE_FRAGRANCE':
      return { ...state, includeFragrance: action.payload };
    case 'SET_CURRENT_PHASE':
      return { ...state, currentPhase: action.payload };
    case 'SET_RAW_RECIPE':
      return { ...state, rawRecipe: action.payload };
    case 'SET_RECIPE_NAME':
      return { ...state, recipeName: action.payload};
    case "UPDATE_RECIPE":
      const { phase, data } = action.payload;
      // Only update the specified phase with new data
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [phase]: {
            ...state.recipe[phase],
            ...data
          }
        }
      };
    case 'RESET_RECIPE':
      return initialRecipeState;
    default:
      return state;
  }
};

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialRecipeState);

  // Effect to send state changes to Firebase
  useEffect(() => {
    console.log(state);
    updateRecipeInFirebase(state);
  }, [state]); // Re-run this effect whenever the state changes

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
