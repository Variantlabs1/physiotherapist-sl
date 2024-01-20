import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";



const INITIAL_STATE = JSON.parse(localStorage.getItem("authState")) || null
export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(INITIAL_STATE);

    // console.log("Auth Provider ");

    // Retrieve authentication state from local storage during initialization
    useEffect(() => {
        // console.log("Auth Provider");
        const storedAuthState = localStorage.getItem("authState");
        console.log(JSON.parse(storedAuthState));
        if (storedAuthState) {
            setUser(JSON.parse(storedAuthState));
        }
    }, []);

    useEffect(() => {
        // console.log("Auth Provider");
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // Store authentication state in local storage
                localStorage.setItem("authState", JSON.stringify(user));
                setUser(user);

            } else {
                // User is signed out.
                setUser(null);
                // Clear authentication state from local storage
                localStorage.removeItem("authState");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
        </>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
