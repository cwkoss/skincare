import { db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';

export const updateRecipeInFirebase = async (recipeState) => {
  try {
    if (!recipeState.recipeId) {
      if (recipeState.baseName) {
        recipeState.recipeId = recipeState.createdAt
            + recipeState.baseName.toLowerCase().replace(/\s/g, '-')
            + recipeState.generation;
      }
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