import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [baseRecipe, setBaseRecipe] = useState(null);
  const [variationRecipe, setVariationRecipe] = useState(null);
  const [status, setStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderAndRecipes = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          const orderData = { id: orderDoc.id, ...orderDoc.data() };
          setOrder(orderData);
          setStatus(orderData.status || 'Pending');

          if (orderData.recipeId) {
            const baseRecipeDoc = await getDoc(doc(db, 'recipes', orderData.recipeId));
            if (baseRecipeDoc.exists()) {
              setBaseRecipe(baseRecipeDoc.data());
            }
          }

          if (orderData.variationId) {
            const variationRecipeDoc = await getDoc(doc(db, 'recipes', orderData.variationId));
            if (variationRecipeDoc.exists()) {
              setVariationRecipe(variationRecipeDoc.data());
            }
          }
        } else {
          setError('Order not found');
        }
      } catch (error) {
        console.error("Error fetching order and recipes:", error);
        setError('Error fetching order and recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderAndRecipes();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const updateData = { status: newStatus };
    if (newStatus === 'Delivered') {
      updateData.deliveredAt = new Date().toISOString();
    }
    await updateDoc(doc(db, 'orders', orderId), updateData);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      navigate('/admin');
    } catch (error) {
      console.error("Error deleting order: ", error);
      setError('Error deleting order');
    }
  };

  const handleBuildVariation = () => {
    navigate(`/build-variation/${orderId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details</h1>
      {error && <p className="error">{error}</p>}
      {order ? (
        <>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt.toDate()).toLocaleString()}</p>
          <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
          <p><strong>Pickup:</strong> {order.pickup ? 'Yes' : 'No'}</p>
          {!order.pickup && (
            <div>
              <p><strong>Address:</strong></p>
              <p>{order.address.street1}</p>
              <p>{order.address.street2}</p>
              <p>Seattle, WA {order.address.zip}</p>
            </div>
          )}

          {order.variationRequest && (
            <div className="variation-request-section">
              <h2>Variation Request</h2>
              {order.variationRequest.selectedOptions && order.variationRequest.selectedOptions.length > 0 && (
                <div>
                  <p><strong>Selected Options:</strong></p>
                  <ul>
                    {order.variationRequest.selectedOptions.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
              {order.variationRequest.customRequest && (
                <div>
                  <p><strong>Custom Request:</strong></p>
                  <p>{order.variationRequest.customRequest}</p>
                </div>
              )}

              {order.variationRequest && !order.variationId && (
                <div className="variation-actions">
                  <button
                    onClick={handleBuildVariation}
                    className="build-variation-button"
                  >
                    Build Variation Recipe
                  </button>
                </div>
              )}
            </div>

          )}

          <p><strong>Status:</strong>
            <select value={status} onChange={handleStatusChange}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>

          {baseRecipe && (
            <div className="recipe-section">
              <h2>Base Recipe</h2>
              <p><strong>Name:</strong> {baseRecipe.displayName || baseRecipe.baseName}</p>
              <div className="recipe-actions">
                <Link to={`/saved-recipe?id=${order.recipeId}`}>
                  View Base Recipe
                </Link>
                <br />
                <Link to={`/order-pricing?recipeId=${order.recipeId}`}>
                  View Base Recipe Pricing
                </Link>
              </div>
              <div>
                <h3>Raw Recipe</h3>
                {baseRecipe.rawRecipe ? (
                  <ul>
                    {Object.entries(baseRecipe.rawRecipe).map(([ingredient, percentage]) => (
                      <li key={ingredient}>{ingredient}: {parseFloat(percentage).toFixed(2)}%</li>
                    ))}
                  </ul>
                ) : (
                  <p>No raw recipe data available.</p>
                )}
              </div>
            </div>
          )}

          {variationRecipe && (
            <div className="recipe-section">
              <h2>Variation Recipe</h2>
              <p><strong>Name:</strong> {variationRecipe.displayName || variationRecipe.baseName}</p>
              <div className="recipe-actions">
                <Link to={`/saved-recipe?id=${order.variationId}`}>
                  View Variation Recipe
                </Link>
                <br />
                <Link to={`/order-pricing?recipeId=${order.variationId}`}>
                  View Variation Recipe Pricing
                </Link>
              </div>
              <div>
                <h3>Raw Recipe</h3>
                {variationRecipe.rawRecipe ? (
                  <ul>
                    {Object.entries(variationRecipe.rawRecipe).map(([ingredient, percentage]) => (
                      <li key={ingredient}>{ingredient}: {parseFloat(percentage).toFixed(2)}%</li>
                    ))}
                  </ul>
                ) : (
                  <p>No raw recipe data available.</p>
                )}
              </div>
            </div>
          )}

          <p>
            {!showDeleteConfirm ? (
              <button onClick={handleDeleteClick} className="delete-button">Delete Order</button>
            ) : (
              <div>
                <button onClick={handleCancelDelete}>Cancel</button>
                <button onClick={handleConfirmDelete} className="confirm-delete-button">Confirm Delete</button>
              </div>
            )}
          </p>
          {status === 'Delivered' && order.deliveredAt && (
            <p><strong>Delivered At:</strong> {new Date(order.deliveredAt).toLocaleString()}</p>
          )}
        </>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default AdminOrderDetails;
