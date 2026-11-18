// Пара токенів, яку повертає POST /auth/refresh.
export interface ITokenPair {
    // Короткоживучий токен доступу — передається в заголовку Authorization: Bearer <accessToken>.
    accessToken: string;
    // Довгоживучий токен — використовується лише для отримання нової пари токенів, коли accessToken протух.
    refreshToken: string;
}
