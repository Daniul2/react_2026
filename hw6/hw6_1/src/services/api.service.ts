// axios — HTTP request library (handier than fetch: parses JSON itself, has interceptors, throws on 4xx/5xx).
import axios from 'axios';
// Server response types (interfaces), so TypeScript knows the data structure.
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IProduct} from "../models/IProduct.ts";
import {IProductsResponseModelType} from "../models/IProductsResponseModelType.ts";
// Helper for reading and parsing values from localStorage.
import {retriveLocalStorage} from "./helpers.ts";
// Type of the token pair returned by /auth/refresh.
import {ITokenPair} from "../models/ITokenPair.ts";

// Type of the data we send to login (POST request body).
type LoginData = {
    // User's username.
    username: string;
    // Password.
    password: string;
    // accessToken lifetime in minutes.
    expiresInMins: number
}

// Create our own axios instance with settings shared by all requests of this service.
const axiosInstance = axios.create({
    // Base address: request paths are appended to it ('/login' → https://dummyjson.com/auth/login).
    baseURL: 'https://dummyjson.com/auth',
    // Default headers — empty here (Authorization is added dynamically in the interceptor below).
    headers: {}
});


// Request interceptor: this function runs BEFORE every request sent through axiosInstance.
// requestObject — the request config (url, method, headers, data...) that can be changed.
axiosInstance.interceptors.request.use((requestObject) => {
    // Add the token only to GET requests (in this example GET means protected resources, e.g. /products).
    // method may be undefined, hence "?." ; toUpperCase — because axios stores the method in lower case ('get').
    if (requestObject.method?.toUpperCase() === 'GET') {
        // Read the saved user from localStorage and set the header
        // Authorization: Bearer <accessToken> — this is how the server knows who makes the request.
        // If there is no user yet, the helper returns {} and the header is "Bearer undefined" → the server answers 401.
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken
    }
    // Always return the (modified) config — otherwise the request is not sent.
    return requestObject;

})


// Login: sends username/password, receives the user with tokens, saves it to localStorage.
// Destructure the argument right in the parameters: ({username, password, expiresInMins}: LoginData).
// Promise<IUserWithTokens> — the function is async and eventually returns the user with tokens.
export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {

    // POST https://dummyjson.com/auth/login with the body {username, password, expiresInMins}.
    // <IUserWithTokens> — type of the data field in the response.
    // {data: userWithTokens} — take the data field from the axios response and rename it to userWithTokens.
    // This is POST, so the interceptor does NOT add a token (there is none yet — we are getting it now).
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>('/login', {username, password, expiresInMins});
    // Log the received user with accessToken and refreshToken to the console.
    console.log(userWithTokens);
    // Save to localStorage under the 'user' key. localStorage stores only strings, hence JSON.stringify.
    localStorage.setItem('user', JSON.stringify(userWithTokens));
    // Return the user to the caller of login (in case they want to use it).
    return userWithTokens;
}

// Loading protected products. Returns an array of products.
export const loadAuthProducts = async (): Promise<IProduct[]> => {
    // GET https://dummyjson.com/auth/products — the interceptor adds Authorization: Bearer <accessToken>.
    // If the token is invalid/expired — axios throws an error (401), and .catch on the page catches it.
    // {data: {products}} — nested destructuring: take the products field straight from response.data.
    const {data: {products}} = await axiosInstance.get<IProductsResponseModelType>('/products');

    // Return only the products array (without total/skip/limit).
    return products
}


// Token refresh: exchange the refreshToken for a new accessToken + refreshToken pair.
export const refresh = async () => {

    // Get the saved user (it holds the current refreshToken).
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    // POST https://dummyjson.com/auth/refresh. This is POST, so the interceptor does not touch the headers.
    // Take the new accessToken and refreshToken straight from the response (type ITokenPair).
    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        // Request body: the refreshToken for which the server issues new tokens.
        refreshToken: iUserWithTokens.refreshToken,
        // Desired lifetime of the new accessToken. Note: there is a typo — the API expects "expiresInMins" (with "s"),
        // so the server ignores this parameter and issues a token with the default lifetime (60 min).
        expiresInMin: 1
    });
    // Replace the old accessToken with the new one in our user object.
    iUserWithTokens.accessToken = accessToken;
    // Replace the refreshToken the same way (the server issues a new one, the old one is no longer used).
    iUserWithTokens.refreshToken = refreshToken;
    // Overwrite the user in localStorage — the next requests (through the interceptor) take the new token.
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));


}
