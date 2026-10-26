// axios — бібліотека для HTTP-запитів (зручніша за fetch: сам парсить JSON, має interceptors, кидає помилку на 4xx/5xx).
import axios from 'axios';
// Типи (інтерфейси) відповідей сервера, щоб TypeScript знав структуру даних.
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IProduct} from "../models/IProduct.ts";
import {IProductsResponseModelType} from "../models/IProductsResponseModelType.ts";
// Хелпер для читання та парсингу значень з localStorage.
import {retriveLocalStorage} from "./helpers.ts";
// Тип пари токенів, яку повертає /auth/refresh.
import {ITokenPair} from "../models/ITokenPair.ts";

// Тип даних, які ми відправляємо на логін (тіло POST-запиту).
type LoginData = {
    // Логін користувача.
    username: string;
    // Пароль.
    password: string;
    // Час життя accessToken у хвилинах.
    expiresInMins: number
}

// Створюємо власний екземпляр axios з налаштуваннями, спільними для всіх запитів цього сервісу.
const axiosInstance = axios.create({
    // Базова адреса: до неї дописуються шляхи запитів ('/login' → https://dummyjson.com/auth/login).
    baseURL: 'https://dummyjson.com/auth',
    // Заголовки за замовчуванням — тут порожньо (Authorization додаємо динамічно в interceptor нижче).
    headers: {}
});


// Interceptor (перехоплювач) запитів: ця функція виконується ПЕРЕД відправкою кожного запиту через axiosInstance.
// requestObject — конфіг запиту (url, method, headers, data...), який можна змінити.
axiosInstance.interceptors.request.use((requestObject) => {
    // Додаємо токен лише для GET-запитів (у цьому прикладі GET — це захищені ресурси, наприклад /products).
    // method може бути undefined, тому "?." ; toUpperCase — бо axios зберігає метод у нижньому регістрі ('get').
    if (requestObject.method?.toUpperCase() === 'GET') {
        // Читаємо збереженого користувача з localStorage і ставимо заголовок
        // Authorization: Bearer <accessToken> — так сервер дізнається, хто робить запит.
        // Якщо користувача ще немає, helper поверне {} і заголовок буде "Bearer undefined" → сервер відповість 401.
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken
    }
    // Обов'язково повертаємо (змінений) конфіг — інакше запит не буде відправлено.
    return requestObject;

})


// Логін: відправляє логін/пароль, отримує користувача з токенами, зберігає його в localStorage.
// Деструктуризуємо аргумент одразу в параметрах: ({username, password, expiresInMins}: LoginData).
// Promise<IUserWithTokens> — функція асинхронна і зрештою поверне користувача з токенами.
export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {

    // POST https://dummyjson.com/auth/login з тілом {username, password, expiresInMins}.
    // <IUserWithTokens> — тип поля data у відповіді.
    // {data: userWithTokens} — з відповіді axios беремо поле data і перейменовуємо його в userWithTokens.
    // Це POST, тож interceptor токен НЕ додає (його ще й немає — ми саме його отримуємо).
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>('/login', {username, password, expiresInMins});
    // Виводимо отриманого користувача з accessToken і refreshToken у консоль.
    console.log(userWithTokens);
    // Зберігаємо в localStorage під ключем 'user'. localStorage вміє зберігати лише рядки, тому JSON.stringify.
    localStorage.setItem('user', JSON.stringify(userWithTokens));
    // Повертаємо користувача тому, хто викликав login (на випадок, якщо він захоче ним скористатися).
    return userWithTokens;
}

// Завантаження захищених продуктів. Повертає масив продуктів.
export const loadAuthProducts = async (): Promise<IProduct[]> => {
    // GET https://dummyjson.com/auth/products — interceptor додасть Authorization: Bearer <accessToken>.
    // Якщо токен невалідний/протух — axios кине помилку (401), і її зловить .catch на сторінці.
    // {data: {products}} — вкладена деструктуризація: з response.data одразу беремо поле products.
    const {data: {products}} = await axiosInstance.get<IProductsResponseModelType>('/products');

    // Повертаємо лише масив продуктів (без total/skip/limit).
    return products
}


// Оновлення токенів: обмінюємо refreshToken на нову пару accessToken + refreshToken.
export const refresh = async () => {

    // Дістаємо збереженого користувача (у ньому лежить поточний refreshToken).
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    // POST https://dummyjson.com/auth/refresh. Це POST, тож interceptor не чіпає заголовки.
    // З відповіді (тип ITokenPair) одразу дістаємо нові accessToken і refreshToken.
    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        // Тіло запиту: refreshToken, за яким сервер видасть нові токени.
        refreshToken: iUserWithTokens.refreshToken,
        // Бажаний час життя нового accessToken. Увага: тут одруківка — API очікує "expiresInMins" (з "s"),
        // тому цей параметр сервер ігнорує і видає токен з часом життя за замовчуванням (60 хв).
        expiresInMin: 1
    });
    // Замінюємо старий accessToken на новий у нашому об'єкті користувача.
    iUserWithTokens.accessToken = accessToken;
    // Так само замінюємо refreshToken (сервер видає новий, старий більше не використовуємо).
    iUserWithTokens.refreshToken = refreshToken;
    // Перезаписуємо користувача в localStorage — наступні запити (через interceptor) візьмуть уже новий токен.
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));


}
