// Відповідь POST /auth/login: дані користувача + його токени. Саме цей об'єкт зберігається в localStorage під ключем 'user'.
export interface IUserWithTokens {
    // Ідентифікатор користувача.
    id: number;
    // Логін.
    username: string;
    // Пошта.
    email: string;
    // Ім'я.
    firstName: string;
    // Прізвище.
    lastName: string;
    // Стать.
    gender: string;
    // Посилання на аватар.
    image: string;
    // Токен доступу для захищених запитів (Authorization: Bearer ...).
    accessToken: string;
    // Токен для оновлення пари токенів через /auth/refresh.
    refreshToken: string;
}
