// API endpoints (users / posts / comments URLs).
import {urls} from '../constants/urls.ts';
// User type — to type the /users response.
import type {IUser} from '../models/IUser.ts';
// Post type — to type the /posts response.
import type {IPost} from '../models/IPost.ts';
// Comment type — to type the /comments response.
import type {IComment} from '../models/IComment.ts';

// Generic GET request: fetches the url and returns the JSON cast to type T.
const getJson = async <T>(url: string): Promise<T> => {
    // Send the request and wait for the server response.
    const response = await fetch(url);
    // fetch does not throw on 404/500 — so we check the status ourselves.
    if (!response.ok) {
        // Throw an error with the status code and text — the thunk catches it and puts it into the store.
        throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
    }
    // Parse the response body as JSON and return it as T.
    return response.json() as Promise<T>;
};

// Service with all API requests — slices call it instead of calling fetch directly.
export const apiService = {
    // Get all users.
    getUsers: () => getJson<IUser[]>(urls.users),
    // Get all posts.
    getPosts: () => getJson<IPost[]>(urls.posts),
    // Get all comments.
    getComments: () => getJson<IComment[]>(urls.comments),
};

// Turns any caught error (unknown) into a string to show to the user.
export const getErrorMessage = (error: unknown): string =>
    // If it is an Error object — take its message, otherwise convert the value to a string.
    error instanceof Error ? error.message : String(error);
