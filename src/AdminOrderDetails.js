import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (orderDoc.exists()) {
        setOrder({ id: orderDoc.id, ...orderDoc.data() });
        setStatus(orderDoc.data().status || 'Pending');
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details</h1>
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
      <p><strong>Recipe:</strong> {order.recipeDisplayName}</p>
      <Link to={`/order-pricing?recipeId=${order.recipeId}`}>
        <button>View Recipe Pricing</button>
      </Link>
    </div>
  );
};

export default AdminOrderDetails;
