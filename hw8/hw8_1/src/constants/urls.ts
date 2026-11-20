// Base address of the jsonplaceholder test API — the common part of all endpoints.
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Object with all app endpoints, so URLs are not duplicated across the code.
export const urls = {
    // List of all users (10 items).
    users: `${BASE_URL}/users`,
    // List of all posts (100 items), each has the author's userId.
    posts: `${BASE_URL}/posts`,
    // List of all comments (500 items), each has the postId of its post.
    comments: `${BASE_URL}/comments`,
};
