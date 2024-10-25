import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { db } from './firebase-config';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user && user.uid) {
                console.log("Fetching orders for user:", user.uid);
                const q = query(
                    collection(db, "orders"),
                    where("creatorId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                console.log("Query snapshot size:", querySnapshot.size);
                
                const orderList = [];
                querySnapshot.forEach((doc) => {
                    console.log("Processing document:", doc.id);
                    const data = doc.data();
                    console.log("Document data:", data);
                    orderList.push({
                        id: doc.id,
                        ...data
                    });
                });
                
                console.log("Processed order list:", orderList);
                setOrders(orderList);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const isAdminUser = user && user.uid === "NMsFUVT3W1MRWRhuQ5PTVJF3IEK2";

    return (
        <div className="dashboard">
            <h1>My Orders</h1>
            <Link className="modern-link" to="/product">+ Create a new recipe</Link>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                {isAdminUser && <p>Order {order.id}</p>}
                                <p>Order Date: {new Date(order.createdAt.toDate()).toLocaleDateString()}</p>
                                <p>Status: {order.status}</p>
                            </div>
                            <div className="recipe-info">
                                <h3>Recipe:</h3>
                                <RecipeLink recipeId={order.recipeId} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const RecipeLink = ({ recipeId }) => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeDoc = await getDoc(doc(db, "recipes", recipeId));
                if (recipeDoc.exists()) {
                    setRecipe({ id: recipeDoc.id, ...recipeDoc.data() });
                } else {
                    console.log(`No recipe found with id: ${recipeId}`);
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (loading) return <p>Loading recipe...</p>;
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <Link to={`/saved-recipe?id=${recipe.id}`}>
            {recipe.displayName || recipe.baseName || 'Unnamed Recipe'}
        </Link>
    );
};

export default Dashboard;
