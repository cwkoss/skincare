import React, { useState } from 'react';
import { db } from './firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const RecipeCopier = () => {
    const [originalId, setOriginalId] = useState('');
    const [newId, setNewId] = useState('');
    const [recipeData, setRecipeData] = useState('');
    const [message, setMessage] = useState('');

    const fetchRecipe = async () => {
        setMessage('Fetching recipe...');
        try {
            const docRef = doc(db, 'recipes', originalId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setRecipeData(JSON.stringify(docSnap.data(), null, 2));
                setMessage('Recipe fetched successfully');
            } else {
                setMessage('No recipe found with this ID');
            }
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    const saveRecipe = async () => {
        setMessage('Saving recipe...');
        try {
            const recipeObject = JSON.parse(recipeData);
            await setDoc(doc(db, 'recipes', newId), recipeObject);
            setMessage(`Recipe saved successfully with new ID: ${newId}`);
        } catch (error) {
            console.error("Error saving recipe:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Recipe Copier</h2>
            <div>
                <label htmlFor="originalId">Original Recipe ID:</label>
                <input 
                    type="text" 
                    id="originalId" 
                    value={originalId} 
                    onChange={(e) => setOriginalId(e.target.value)}
                />
                <button onClick={fetchRecipe}>Get Recipe</button>
            </div>
            <div>
                <label htmlFor="recipeData">Recipe Data:</label>
                <textarea 
                    id="recipeData" 
                    value={recipeData} 
                    onChange={(e) => setRecipeData(e.target.value)}
                    rows="20" 
                    cols="50"
                />
            </div>
            <div>
                <label htmlFor="newId">New Recipe ID:</label>
                <input 
                    type="text" 
                    id="newId" 
                    value={newId} 
                    onChange={(e) => setNewId(e.target.value)}
                />
                <button onClick={saveRecipe}>Save Recipe</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RecipeCopier;
