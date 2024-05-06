import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { skincareProducts } from './Product';

// Assuming you have a utility function for Firebase operations
import { updateRecipeInFirebase } from './FirebaseUtils';
import { act } from 'react';

const RecipeContext = createContext();

const initialRecipeState = {
  goalsData: [],
  productData: '',
  includeFragrance: 'no',
  selectedMoods: [],
  phaseOrder: [],
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return { ...state, productData: action.payload, phaseOrder: skincareProducts[action.payload].typeOrder};
    case 'SET_GOALS_DATA':
      return { ...state, goalsData: action.payload };
    case 'SET_INCLUDE_FRAGRANCE':
      return { ...state, includeFragrance: action.payload };
    case 'SET_SELECTED_MOODS':
      return { ...state, selectedMoods: action.payload };
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
