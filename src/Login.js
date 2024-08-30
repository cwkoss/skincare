import React from "react";
import { auth, provider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from "./firebase-config";
import { useUser } from './UserContext';

const Login = () => {
    const { user } = useUser();

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
                console.log(result.user);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Handle the redirect result after returning from the provider's page
    React.useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log(result.user);
                }
            } catch (error) {
                console.error("Error handling redirect: ", error);
            }
        };

        checkRedirectResult();
    }, []);

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
