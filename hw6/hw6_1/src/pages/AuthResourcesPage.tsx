// useEffect — to make a request once after the page appears.
import {useEffect} from "react";
// loadAuthProducts — GET /auth/products (protected resource, accessToken required);
// refresh — POST /auth/refresh, gets a new token pair by refreshToken.
import {loadAuthProducts, refresh} from "../services/api.service.ts";

// Protected resources page (route "/auth/resources").
export const AuthResourcesPage = () => {

    // Runs once when the page opens ([] — no dependencies).
    useEffect(() => {
        // 1) Try to load products with the current accessToken (the interceptor in api.service.ts adds it).
        loadAuthProducts().then(products => {
            // Success — the token is still valid, just log the products to the console.
            console.log(products)
        // 2) Error — most likely 401 Unauthorized: the accessToken expired (it lived 1 minute)
        //    or we have not logged in yet.
        }).catch(reason => {
            // Log the error to see it in the console (status 401 will be there).
            console.log(reason);
            // 3) Refresh the tokens: send the refreshToken, get a new accessToken + refreshToken
            //    and refresh() saves them to localStorage itself.
            refresh()
                // 4) When the new tokens are saved — repeat the same request (the interceptor takes the NEW token).
                .then(() => loadAuthProducts())
                // 5) Log the products received after the token refresh.
                .then(value => console.log(value))
            // Note: if refresh also fails (the refreshToken expired too / not logged in) —
            // the error is not handled here, and the console shows "Uncaught (in promise)".
        })

    }, []);

    return (
        // The page renders no data — check the result in the browser console (F12 → Console).
        <>
            AuthResourcesPage
        </>
    );
};
