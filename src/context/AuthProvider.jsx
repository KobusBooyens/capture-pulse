import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("authToken", authToken);
        } else {
            localStorage.removeItem("authToken");
        }

        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [authToken, currentUser]);

    async function handleSignIn(authToken, user) {
        setAuthToken(authToken);
        setCurrentUser(user);
    }

    async function handleSignOut() {
        setAuthToken(null);
        setCurrentUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ authToken, currentUser, handleSignIn, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside of a AuthProvider");
    }

    return context;
}

