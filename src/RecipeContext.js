import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { skincareProducts } from './Product';

// Assuming you have a utility function for Firebase operations
import { updateRecipeInFirebase } from './FirebaseUtils';
import { act } from 'react';

const RecipeContext = createContext();

const initialRecipeState = {
  recipeId: '', // TODO: Change to basename + generation + timestamp
  createdAt: new Date().getTime().toString(),
  goalsData: [],
  productData: '',
  includeFragrance: 'no',
  phaseOrder: [],
  currentPhase: "",
  recipe: {},
  rawRecipe: {},
  recipeName: '', //deprecated old field
  baseName: 'Untitled', // "Bob's Cool Cream"
  variationName: '', //"Lavender"
  generation: 0,
  displayName: 'Untitled (Gen 0)',  // "Bob's Cool Cream var. Lavender (Gen 2)
  originRecipeId: '', // if generation zero, equal to recipeId, if not, equal to recursed parent recipeId, used to query all generations of a recipe
  parentRecipeId: '', // if generation zero, equal to recipeId, if not, equal to parent recipeId
  creatorId: '', // user id of the creator
  orderCount: 0, // number of times this recipe has been ordered
  favoriteCount: 0, // number of times this recipe has been favorited
  status: 'incomplete', // incomplete, complete, archived
  variationRequest: {
    selectedOptions: [],
    customRequest: ''
  },
};

const generateDisplayName = (baseName, variationName, generation) => {
  let displayName = baseName || 'Untitled';
  if (variationName) {
    displayName += ` var. ${variationName}`;
  }
  displayName += ` (Gen ${generation})`;
  return displayName;
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
      return { ...state, recipeName: action.payload };
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
    case 'SET_BASE_NAME':
      return {
        ...state,
        baseName: action.payload,
        displayName: generateDisplayName(action.payload, state.variationName, state.generation),
        recipeId: state.createdAt + action.payload + state.generation
      };
    case 'SET_VARIATION_NAME':
      return {
        ...state,
        variationName: action.payload,
        displayName: generateDisplayName(state.baseName, action.payload, state.generation)
      };
    case 'SET_GENERATION':
      return {
        ...state,
        generation: action.payload,
        displayName: generateDisplayName(state.baseName, state.variationName, action.payload),
        recipeId: state.createdAt + state + baseName + state.generation
      };
    case 'CREATE_VARIATION':
      const newGeneration = state.generation + 1;
      return {
        ...initialRecipeState,
        createdAt: new Date().getTime().toString(),
        baseName: state.baseName,
        parentRecipeId: state.recipeId,
        originRecipeId: state.originRecipeId || state.recipeId,
        generation: newGeneration,
        displayName: generateDisplayName(state.baseName, '', newGeneration),
        recipe: JSON.parse(JSON.stringify(state.recipe)), // Deep copy
        rawRecipe: JSON.parse(JSON.stringify(state.rawRecipe)), // Deep copy
        productData: state.productData,
        goalsData: [...state.goalsData],
        includeFragrance: state.includeFragrance,
        phaseOrder: [...state.phaseOrder],
        currentPhase: state.currentPhase
      };
    case 'SET_PARENT_RECIPE_ID':
      return { ...state, parentRecipeId: action.payload };
    case 'SET_ORIGIN_RECIPE_ID':
      return { ...state, originRecipeId: action.payload };
    case 'SET_GENERATION':
      return { ...state, generation: action.payload };
    case 'INCREMENT_ORDER_COUNT':
      return { ...state, orderCount: state.orderCount + 1 };
    case 'INCREMENT_FAVORITE_COUNT':
      return { ...state, favoriteCount: state.favoriteCount + 1 };
    case 'DECREMENT_FAVORITE_COUNT':
      return { ...state, favoriteCount: Math.max(0, state.favoriteCount - 1) };
    case 'CREATE_VARIATION':
      return {
        ...initialRecipeState,
        baseName: state.baseName,
        parentRecipeId: state.id,
        originRecipeId: state.originRecipeId || state.id,
        generation: state.generation + 1,
        recipe: JSON.parse(JSON.stringify(state.recipe)), // Deep copy
        rawRecipe: JSON.parse(JSON.stringify(state.rawRecipe)), // Deep copy
        productData: state.productData,
        goalsData: [...state.goalsData],
        includeFragrance: state.includeFragrance,
        phaseOrder: [...state.phaseOrder],
        currentPhase: state.currentPhase
      };
    case 'SET_VARIATION_REQUEST':
      return {
        ...state,
        variationRequest: action.payload
      };
    default:
      return state;
  }
};

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialRecipeState);

  // Effect to send state changes to Firebase
  useEffect(() => {
    if (state.baseName === 'Untitled') {
      return;
    }
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
