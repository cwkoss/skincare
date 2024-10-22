import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "./firebase-config";
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { user, loading, logout } = useUser();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            console.log('Login: Attempting sign-in with popup');
            await signInWithPopup(auth, provider);
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
