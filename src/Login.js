import React, { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from "./firebase-config";
import { useUser } from './UserContext';

const Login = () => {
    const { user, setUser } = useUser();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isMobileDevice = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    const handleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (isMobileDevice()) {
                await signInWithRedirect(auth, provider);
            } else {
                const result = await signInWithPopup(auth, provider);
                setUser(result.user);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setError("Failed to log in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out: ", error);
            setError("Failed to log out. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Error handling redirect: ", error);
                setError("Failed to complete login. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsLoading(false);
        });

        checkRedirectResult();

        return () => unsubscribe();
    }, [setUser]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user && user.uid) {
        return (
            <div>
                <h1>Welcome, {user.displayName}</h1>
                <button onClick={handleLogout} disabled={isLoading}>
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