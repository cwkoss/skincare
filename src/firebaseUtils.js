import { db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';

export const updateRecipeInFirebase = async (recipeState) => {
  try {
    if (!recipeState.recipeId) {
      console.error('Recipe ID is missing');
      return;
    }
    
    console.log('Updating recipe in Firebase:', recipeState);

    const recipeDocRef = doc(db, 'recipes', recipeState.recipeId);
    await setDoc(recipeDocRef, recipeState, { merge: true });

    console.log('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating recipe in Firebase:', error);
  }
};