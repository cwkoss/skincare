import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import Layout from './Layout';
import IngredientTypeahead from './components/IngredientTypeahead';
import { generateDisplayName } from './RecipeContext';

function BuildVariation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [baseRecipe, setBaseRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPercentage, setTotalPercentage] = useState(100);
  const [error, setError] = useState(null);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [variationName, setVariationName] = useState('');

  useEffect(() => {
    const fetchOrderAndRecipe = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          const orderData = orderDoc.data();
          setOrder(orderData);
          
          if (orderData.recipeId) {
            const recipeDoc = await getDoc(doc(db, 'recipes', orderData.recipeId));
            if (recipeDoc.exists()) {
              const recipeData = recipeDoc.data();
              setBaseRecipe(recipeData);
              setNewRecipe({
                ...recipeData,
                rawRecipe: { ...recipeData.rawRecipe },
                parentRecipeId: orderData.recipeId,
                createdAt: new Date().getTime()
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndRecipe();
  }, [orderId]);

  const handleIngredientChange = (ingredient, newValue) => {
    const newPercentage = parseFloat(newValue) || 0;
    
    setNewRecipe(prev => {
      const updatedRecipe = {
        ...prev,
        rawRecipe: {
          ...prev.rawRecipe,
          [ingredient]: newPercentage
        }
      };
      
      // Calculate new total
      const newTotal = Object.values(updatedRecipe.rawRecipe)
        .reduce((sum, val) => sum + parseFloat(val || 0), 0);
      setTotalPercentage(newTotal);
      
      return updatedRecipe;
    });
  };

  const validateRecipe = () => {
    if (Math.abs(totalPercentage - 100) > 0.1) {
      setError("Total percentage must equal 100%");
      return false;
    }
    if (!variationName.trim()) {
      setError("Please enter a variation name");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSaveVariation = async () => {
    if (!validateRecipe()) return;

    try {
      const variationId = `${newRecipe.createdAt}-${orderId}`;
      
      // Strip any existing generation number from the base name
      const baseNameWithoutGen = (baseRecipe.displayName || baseRecipe.baseName)
        .replace(/\s*\(Gen \d+\)/, '');
      
      const updatedRecipe = {
        ...newRecipe,
        displayName: generateDisplayName(
          baseNameWithoutGen,
          variationName,
          (baseRecipe.generation || 0) + 1
        ),
        generation: (baseRecipe.generation || 0) + 1,
        variationName: variationName
      };
      
      await setDoc(doc(db, 'recipes', variationId), updatedRecipe);
      await updateDoc(doc(db, 'orders', orderId), {
        variationId: variationId
      });
      
      navigate(`/admin/order/${orderId}`);
    } catch (error) {
      console.error("Error saving variation:", error);
      setError("Failed to save variation");
    }
  };

  // Add new ingredient handler
  const handleAddIngredient = (ingredientName) => {
    setNewRecipe(prev => ({
      ...prev,
      rawRecipe: {
        ...prev.rawRecipe,
        [ingredientName]: 0
      }
    }));
    setShowAddIngredient(false);
  };

  // Reset ingredient to base value
  const handleResetIngredient = (ingredient) => {
    setNewRecipe(prev => ({
      ...prev,
      rawRecipe: {
        ...prev.rawRecipe,
        [ingredient]: baseRecipe.rawRecipe[ingredient] || 0
      }
    }));
    
    // Recalculate total
    const updatedRecipe = {
      ...newRecipe,
      rawRecipe: {
        ...newRecipe.rawRecipe,
        [ingredient]: baseRecipe.rawRecipe[ingredient] || 0
      }
    };
    const newTotal = Object.values(updatedRecipe.rawRecipe)
      .reduce((sum, val) => sum + parseFloat(val || 0), 0);
    setTotalPercentage(newTotal);
  };

  // Remove ingredient
  const handleRemoveIngredient = (ingredient) => {
    setNewRecipe(prev => {
      const updatedRecipe = { ...prev };
      delete updatedRecipe.rawRecipe[ingredient];
      return updatedRecipe;
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout
      title="Build Variation Recipe"
      handleSubmit={handleSaveVariation}
      buttonText="Save Variation"
      isSubmitDisabled={!!error}
      whyDisabled={error}
    >
      <div className="build-variation-container">
        <div className="variation-request-info">
          <h2>Variation Request</h2>
          {order?.variationRequest?.selectedOptions && (
            <div>
              <h3>Selected Options:</h3>
              <ul>
                {order.variationRequest.selectedOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          )}
          {order?.variationRequest?.customRequest && (
            <div>
              <h3>Custom Request:</h3>
              <p>{order.variationRequest.customRequest}</p>
            </div>
          )}
        </div>

        <div className="variation-name-input">
          <label htmlFor="variationName">Variation Name *</label>
          <input
            type="text"
            id="variationName"
            value={variationName}
            onChange={(e) => setVariationName(e.target.value)}
            required
          />
        </div>

        {baseRecipe && newRecipe && (
          <div className="recipe-editor">
            <h2>Recipe Editor</h2>
            <div className="total-percentage">
              Total: {totalPercentage.toFixed(2)}%
              <div className={`percentage-indicator ${Math.abs(totalPercentage - 100) < 0.1 ? 'valid' : 'invalid'}`}>
                {totalPercentage === 100 ? '✓' : '!'}
              </div>
            </div>
            
            <div className="ingredients-grid">
              {Object.entries(newRecipe.rawRecipe).map(([ingredient, percentage]) => (
                <div key={ingredient} className="ingredient-input">
                  <div className="ingredient-header">
                    <label htmlFor={ingredient}>{ingredient}</label>
                    <div className="ingredient-actions">
                      <button 
                        className="reset-button"
                        onClick={() => handleResetIngredient(ingredient)}
                        title="Reset to base recipe value"
                      >
                        ↺
                      </button>
                      {!baseRecipe.rawRecipe[ingredient] && (
                        <button 
                          className="remove-button"
                          onClick={() => handleRemoveIngredient(ingredient)}
                          title="Remove ingredient"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="percentage-input">
                    <input
                      type="number"
                      id={ingredient}
                      value={percentage}
                      onChange={(e) => handleIngredientChange(ingredient, e.target.value)}
                      step="0.1"
                      min="0"
                      max="100"
                    />
                    <span className="percentage-symbol">%</span>
                  </div>
                  {baseRecipe.rawRecipe[ingredient] && (
                    <div className="base-percentage">
                      Base: {baseRecipe.rawRecipe[ingredient]}%
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="add-ingredient-section">
              {showAddIngredient ? (
                <IngredientTypeahead
                  onSelect={handleAddIngredient}
                  existingIngredients={Object.keys(newRecipe.rawRecipe)}
                />
              ) : (
                <button 
                  className="add-ingredient-button"
                  onClick={() => setShowAddIngredient(true)}
                >
                  + Add Ingredient
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BuildVariation; 