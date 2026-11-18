# ДЗ 6 — розбір прикладу `lessons/lesson6/authentication`

Код взятий з гілки [OktenSchool/react → lessons/lesson6/authentication](https://github.com/OktenSchool/react/tree/lessons/lesson6/authentication/src)
**без змін** — над кожним рядком у `src/` додано коментар, що він робить.

## Що робить застосунок

Демонструє авторизацію через JWT-токени на [dummyjson.com/auth](https://dummyjson.com/docs/auth):

1. **`/login`** → `login()` робить `POST /auth/login` з логіном/паролем і отримує користувача
   з двома токенами: `accessToken` (живе 1 хв) і `refreshToken`. Усе зберігається в `localStorage['user']`.
2. **`/auth/resources`** → `loadAuthProducts()` робить `GET /auth/products`.
   Interceptor axios перед кожним GET-запитом додає заголовок `Authorization: Bearer <accessToken>`.
3. Якщо `accessToken` протух → сервер відповідає **401** → у `.catch` викликається `refresh()`:
   `POST /auth/refresh` з `refreshToken` → нова пара токенів записується в `localStorage`
   → запит продуктів повторюється вже з новим токеном.

```
LoginPage ──login()──► POST /auth/login ──► localStorage['user'] = {...user, accessToken, refreshToken}

AuthResourcesPage ──loadAuthProducts()──► interceptor: + Authorization: Bearer accessToken ──► GET /auth/products
        │                                                                                         │
        │◄──────────────────────────── 200: products ◄──────────────────────────────────────────┤
        │◄──────────────────────────── 401: токен протух ◄──────────────────────────────────────┘
        └─► refresh() ──► POST /auth/refresh {refreshToken} ──► нові токени в localStorage ──► loadAuthProducts() ще раз
```

## Файли

| Файл | Роль |
|---|---|
| `main.tsx` | Точка входу: рендерить `RouterProvider` з роутером |
| `routes/routes.tsx` | Маршрути: `/` (Home), `/login`, `/auth/resources` всередині `MainLayout` |
| `layouts/MainLayout.tsx` | Меню + `<Outlet/>` для поточної сторінки |
| `components/menu/Menu.tsx` | Посилання `Link` на три сторінки |
| `pages/LoginPage.tsx` | Логін при відкритті сторінки (дані зашиті в код) |
| `pages/AuthResourcesPage.tsx` | Запит захищених продуктів + refresh при помилці |
| `services/api.service.ts` | axios-екземпляр, interceptor, `login`, `loadAuthProducts`, `refresh` |
| `services/helpers.ts` | `retriveLocalStorage<T>` — читання та парсинг JSON з `localStorage` |
| `models/*` | TypeScript-типи відповідей сервера |
| `App.tsx`, `App.css` | Залишки шаблону Vite, не використовуються |

## Як подивитися в дії

```
npm install
npm run dev
```

Відкрити `http://localhost:5173`, натиснути **F12**:

1. Перейти на **login** → у *Console* з'явиться користувач з токенами,
   у *Application → Local Storage* — ключ `user`.
2. Одразу перейти на **resources** → у *Console* масив продуктів (токен ще живий).
3. Зачекати > 1 хв і знову відкрити **resources** → у *Network* видно `products` зі статусом **401**,
   потім `refresh` (200) і повторний `products` (200); у *Console* — помилка і продукти.

## Що помітив під час розбору

- `refresh()` відправляє `expiresInMin` замість `expiresInMins` → сервер ігнорує параметр,
  тож новий `accessToken` живе за замовчуванням 60 хв, а не 1.
- Якщо відкрити **resources** без логіну, interceptor надішле `Bearer undefined` → 401,
  `refresh()` теж впаде (немає `refreshToken`), а ця помилка ніде не обробляється (`Uncaught (in promise)`).
- Interceptor додає токен лише до GET-запитів — `login` і `refresh` (POST) токен не потребують.
- Назва `retriveLocalStorage` з одруківкою (`retrieve`).
