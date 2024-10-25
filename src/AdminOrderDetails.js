import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [formulation, setFormulation] = useState(null);
  const [status, setStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderAndRecipe = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          const orderData = { id: orderDoc.id, ...orderDoc.data() };
          setOrder(orderData);
          setStatus(orderData.status || 'Pending');

          if (orderData.recipeId) {
            try {
              const recipeDoc = await getDoc(doc(db, 'recipes', orderData.recipeId));
              if (recipeDoc.exists()) {
                setRecipe(recipeDoc.data());
              } else {
                // Fallback to formulations table
                const formulationDoc = await getDoc(doc(db, 'formulations', orderData.recipeId));
                if (formulationDoc.exists()) {
                  setFormulation(formulationDoc.data());
                } else {
                  setError('Recipe not found');
                }
              }
            } catch (recipeError) {
              console.error("Error fetching recipe:", recipeError);
              setError('Error fetching recipe');
            }
          }
        } else {
          setError('Order not found');
        }
      } catch (orderError) {
        console.error("Error fetching order:", orderError);
        setError('Error fetching order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderAndRecipe();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
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
          <p><strong>Status:</strong> 
            <select value={status} onChange={handleStatusChange}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
          
          {recipe ? (
            <>
              <p><strong>Recipe:</strong> {recipe.displayName || recipe.baseName}</p>
              <div>
                <h2>Raw Recipe</h2>
                {recipe.rawRecipe ? (
                  <ul>
                    {Object.entries(recipe.rawRecipe).map(([ingredient, percentage]) => (
                      <li key={ingredient}>{ingredient}: {parseFloat(percentage).toFixed(2)}%</li>
                    ))}
                  </ul>
                ) : (
                  <p>No raw recipe data available.</p>
                )}
              </div>
            </>
          ) : formulation ? (
            <>
              <p><strong>Formulation:</strong></p>
              <pre>{JSON.stringify(formulation, null, 2)}</pre>
            </>
          ) : (
            <p>No recipe or formulation data available.</p>
          )}

          <Link to={`/order-pricing?recipeId=${order.recipeId}`}>
            <button>View Recipe Pricing</button>
          </Link>
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
        </>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default AdminOrderDetails;
