import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "./firebase-config";
import { useUser } from './UserContext';
import { useRecipe } from './RecipeContext';
import { Link } from 'react-router-dom';
import { saveUserToFirestore } from './userUtils';

const Login = () => {
    const { user, loading, logout } = useUser();
    const { dispatch } = useRecipe();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            console.log('Login: Attempting sign-in with popup');
            const result = await signInWithPopup(auth, provider);
            // Save user data to Firestore
            await saveUserToFirestore(result.user);
            // Update creatorId in RecipeContext after successful login
            if (result.user) {
                dispatch({ type: 'SET_CREATOR_ID', payload: result.user.uid });
            }
        } catch (error) {
            console.error("Login: Error logging in", error);
            setError("Failed to log in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Login: Current user state', user);
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <div>
                <h1>Welcome, {user.displayName}</h1>
                <p>Email: {user.email}</p>
                <Link to="/dashboard">View My Recipes</Link>
                {user.email === 'chris@mckoss.com' && (
                    <Link to="/admin">Go to Admin Page</Link>
                )}
                <button onClick={logout} disabled={isLoading}>
                    {isLoading ? "Logging out..." : "Logout"}
                </button>
            </div>
        );
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login with Google"}
            </button>
        </div>
    );
};

export default Login;
