// Token pair returned by POST /auth/refresh.
export interface ITokenPair {
    // Short-lived access token — sent in the Authorization: Bearer <accessToken> header.
    accessToken: string;
    // Long-lived token — used only to get a new token pair when the accessToken has expired.
    refreshToken: string;
}
