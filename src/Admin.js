import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { Navigate, Link } from 'react-router-dom';
import { db } from './firebase-config';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';

const Admin = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(ordersQuery);
      
      const ordersList = await Promise.all(querySnapshot.docs.map(async (orderDoc) => {
        const orderData = orderDoc.data();
        let recipeDisplayName = "LEGACY";
        let recipeName = "LEGACY";
        
        if (orderData.recipeId) {
          const recipeDoc = await getDoc(doc(db, 'recipes', orderData.recipeId));
          if (recipeDoc.exists()) {
            const recipeData = recipeDoc.data();
            recipeDisplayName = recipeData.displayName || "LEGACY";
            recipeName = recipeData.recipeName || "LEGACY";
          }
        }
        
        return {
          id: orderDoc.id,
          ...orderData,
          recipeDisplayName,
          recipeName
        };
      }));
      
      setOrders(ordersList);
    };

    if (user && user.email === 'chris@mckoss.com') {
      fetchOrders();
    }
  }, [user]);

  if (!user || user.email !== 'chris@mckoss.com') {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Orders ({orders.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>OldRecipeName</th>
            <th>Recipe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{new Date(order.createdAt.toDate()).toLocaleString()}</td>
              <td>{order.status || 'Pending'}</td>
              <td>{order.recipeName}</td>
              <td>{order.recipeDisplayName}</td>
              <td>
                <Link to={`/admin/order/${order.id}`}>
                  <button>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
