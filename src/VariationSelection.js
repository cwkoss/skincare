import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFormatedIngredientsList } from './ingredients';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

function VariationSelection() {
    const navigate = useNavigate();
    const location = useLocation();

    const [variations, setVariations] = useState([]);
    const [selectedVariations, setSelectedVariations] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [recipeData, setRecipeData] = useState(null);

    // Fetch recipe data from the endpoint
    useEffect(() => {
        setIsLoading(true);
        const searchParams = new URLSearchParams(location.search);
        const recipeId = searchParams.get('recipeId');
        if (recipeId) {
            const fetchData = async () => {
                const docRef = doc(db, "formulations", recipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipeData(docSnap.data());
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [location.search]);

    // Fetch variations from the endpoint
    useEffect(() => {
        if (recipeData) {
            const fetchVariations = async () => {
                setIsLoading(true);
                try {
                    const ingredientList = getFormatedIngredientsList();
                    console.log('Ingredients:', ingredientList);
                    const response = await fetch('https://us-central1-skincare-recipe-tool.cloudfunctions.net/getRecipeVariations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ recipe: recipeData, ingredients: ingredientList })
                    });
                    console.log('Response:', response);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    console.log('Data:', data.reply.choices[0].message.content);
                    const reply = data.reply.choices[0].message.content;
                    setVariations(JSON.parse(reply));
                } catch (error) {
                    console.error('Error fetching variations:', error);
                    // Handle error state here
                } finally {
                    console.log('Variations fetched:', variations);
                    setIsLoading(false);
                }
            };
            fetchVariations();
        }
    }, [recipeData]);

    // TEMPORARY
    useEffect(() => {
        console.log('Variations updated:', variations);
    }, [variations]); // Log variations when they change

    const handleSelectionChange = (variationIndex) => {
        const newSelection = new Set(selectedVariations);
        if (newSelection.has(variationIndex)) {
            newSelection.delete(variationIndex);
        } else {
            newSelection.add(variationIndex);
        }
        setSelectedVariations(newSelection);
    };

    const handleSubmit = () => {
        console.log('Selected variations:', [...selectedVariations]);
        // Implement submission logic here
    };

    return (
        <div className="variation-selection">
            <h2>Select Your Desired Recipe Variations</h2>
            {isLoading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading variations...</p>
                </div>
            ) : (
                <div>
                    <button onClick={() => handleSelectionChange('original')}>Original Recipe</button>
                    {variations.map((variation, index) => (
                        <div key={index} onClick={() => handleSelectionChange(index)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
                            <h3>{variation.tagline}</h3>
                            <p>{variation.description}</p>
                            <ul>
                                {Object.keys(variation).filter(key => key !== 'tagline' && key !== 'description' && variation[key] !== 0).map(key => (
                                    <li key={key}>{`${key}: ${variation[key] > 0 ? '+' : ''}${variation[key]}`}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            )}
            <button
                onClick={handleSubmit}
                disabled={selectedVariations.size !== 2}
            >
                Submit
            </button>
        </div>
    );
}

export default VariationSelection;
