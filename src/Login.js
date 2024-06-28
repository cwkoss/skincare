// Login.js
import React from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase-config";
import { useUser } from './UserContext';

const Login = () => {
    const { user } = useUser();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
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

    if (user && user.uid) {
        return (
            <div>
                <h1>Welcome, {user.displayName}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
