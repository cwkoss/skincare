import { db } from './firebaseConfig'; // Your Firebase configuration and initialization
import { doc, setDoc } from 'firebase/firestore';

export const updateRecipeInFirebase = async (recipeState) => {
  const recipeDocRef = doc(db, 'recipes', 'yourRecipeId'); // Define how you get your recipe ID
  await setDoc(recipeDocRef, recipeState, { merge: true });
};
