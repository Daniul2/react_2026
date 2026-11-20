// POST /auth/login response: user data + their tokens. This object is stored in localStorage under the 'user' key.
export interface IUserWithTokens {
    // User identifier.
    id: number;
    // Username.
    username: string;
    // Email.
    email: string;
    // First name.
    firstName: string;
    // Last name.
    lastName: string;
    // Gender.
    gender: string;
    // Avatar link.
    image: string;
    // Access token for protected requests (Authorization: Bearer ...).
    accessToken: string;
    // Token for refreshing the token pair via /auth/refresh.
    refreshToken: string;
}
