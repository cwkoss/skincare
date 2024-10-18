import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signInWithRedirect } from "./firebase-config";
import { useUser } from './UserContext';

const Login = () => {
    const { user, loading, logout } = useUser();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isMobileDevice = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    const handleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (isMobileDevice()) {
                console.log('Login: Attempting redirect sign-in');
                await signInWithRedirect(auth, provider);
                // The page will redirect, so we don't need to do anything else here
            } else {
                console.log('Login: Attempting popup sign-in');
                await signInWithPopup(auth, provider);
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