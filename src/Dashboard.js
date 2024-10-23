import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { db } from './firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (user && user.uid) {
                const q = query(collection(db, "recipes"), where("creatorId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const recipeList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecipes(recipeList);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Recipes</h1>
            {recipes.length === 0 ? (
                <p>You haven't created any recipes yet.</p>
            ) : (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/saved-recipe?id=${recipe.id}`}>
                                {recipe.displayName || recipe.baseName}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/product">Create a new recipe</Link>
        </div>
    );
};

export default Dashboard;
