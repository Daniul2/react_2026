// useEffect — hook for side effects (requests, timers, etc.) after the component renders.
import {useEffect} from "react";
// Login function from our service: makes POST /auth/login and saves the user with tokens to localStorage.
import {login} from "../services/api.service.ts";

// Login page (route "/login").
export const LoginPage = () => {
    // An effect with an empty dependency array [] runs ONCE — when the page appears on screen.
    useEffect(() => {
        // Log in right away. There is no form yet — the data is hardcoded for the demo.
        login({
            // Test user that exists in dummyjson.
            username: 'emilys',
            // Their password.
            password: 'emilyspass',
            // How many minutes the accessToken lives. 1 min — intentionally short,
            // to quickly see how the token expires and how refresh works.
            expiresInMins: 1
        });
        // The Promise returned by login is not handled here (no .then/.catch) —
        // we see the result in console.log inside login and in localStorage.
    }, []);

    return (
        // Just the page text.
        <>
            login Page
        </>
    );
};
