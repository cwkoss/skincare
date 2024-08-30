import React, { useEffect } from "react";
import { auth, provider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from "./firebase-config";
import { useUser } from './UserContext';

const Login = () => {
    const { user, setUser } = useUser(); // Assume setUser is provided by your UserContext to set the user state

    // Function to detect if the user is on a mobile device
    const isMobileDevice = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    const handleLogin = async () => {
        try {
            if (isMobileDevice()) {
                await signInWithRedirect(auth, provider);
            } else {
                const result = await signInWithPopup(auth, provider);
                setUser(result.user); // Update the user context immediately
                console.log(result.user);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear the user context on logout
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Handle the redirect result after returning from the provider's page
    useEffect(() => {
        console.log("Checking redirect result");
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    setUser(result.user); // Update the user context with the result
                    console.log(result.user);
                }
            } catch (error) {
                console.error("Error handling redirect: ", error);
            }
        };

        checkRedirectResult();

        // Optional: Listen for auth state changes to ensure the user is always captured
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user); // Update the user context if a user is authenticated
            }
        });

        return () => unsubscribe(); // Cleanup on component unmount
    }, [setUser]);

    if (user && user.uid) {
        return (
            <div>
                <h1>Welcome, {user.displayName}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
