# HW 6 — walkthrough of the `lessons/lesson6/authentication` example

The code is taken from the [OktenSchool/react → lessons/lesson6/authentication](https://github.com/OktenSchool/react/tree/lessons/lesson6/authentication/src) branch
**unchanged** — a comment explaining what it does is added above every line in `src/`.

## What the app does

It demonstrates authorization with JWT tokens on [dummyjson.com/auth](https://dummyjson.com/docs/auth):

1. **`/login`** → `login()` makes `POST /auth/login` with username/password and receives the user
   with two tokens: `accessToken` (lives 1 min) and `refreshToken`. Everything is saved to `localStorage['user']`.
2. **`/auth/resources`** → `loadAuthProducts()` makes `GET /auth/products`.
   Before every GET request the axios interceptor adds the `Authorization: Bearer <accessToken>` header.
3. If the `accessToken` has expired → the server answers **401** → `.catch` calls `refresh()`:
   `POST /auth/refresh` with the `refreshToken` → the new token pair is saved to `localStorage`
   → the products request is repeated with the new token.

```
LoginPage ──login()──► POST /auth/login ──► localStorage['user'] = {...user, accessToken, refreshToken}

AuthResourcesPage ──loadAuthProducts()──► interceptor: + Authorization: Bearer accessToken ──► GET /auth/products
        │                                                                                         │
        │◄──────────────────────────── 200: products ◄──────────────────────────────────────────┤
        │◄──────────────────────────── 401: token expired ◄─────────────────────────────────────┘
        └─► refresh() ──► POST /auth/refresh {refreshToken} ──► new tokens in localStorage ──► loadAuthProducts() again
```

## Files

| File | Role |
|---|---|
| `main.tsx` | Entry point: renders `RouterProvider` with the router |
| `routes/routes.tsx` | Routes: `/` (Home), `/login`, `/auth/resources` inside `MainLayout` |
| `layouts/MainLayout.tsx` | Menu + `<Outlet/>` for the current page |
| `components/menu/Menu.tsx` | `Link`s to the three pages |
| `pages/LoginPage.tsx` | Logs in when the page opens (the data is hardcoded) |
| `pages/AuthResourcesPage.tsx` | Request for protected products + refresh on error |
| `services/api.service.ts` | axios instance, interceptor, `login`, `loadAuthProducts`, `refresh` |
| `services/helpers.ts` | `retriveLocalStorage<T>` — reads and parses JSON from `localStorage` |
| `models/*` | TypeScript types of the server responses |
| `App.tsx`, `App.css` | Leftovers from the Vite template, not used |

## How to see it in action

```
npm install
npm run dev
```

Open `http://localhost:5173` and press **F12**:

1. Go to **login** → the user with tokens appears in *Console*,
   and the `user` key appears in *Application → Local Storage*.
2. Go to **resources** right away → *Console* shows the products array (the token is still valid).
3. Wait > 1 min and open **resources** again → *Network* shows `products` with status **401**,
   then `refresh` (200) and a repeated `products` (200); *Console* shows the error and the products.

## What I noticed during the walkthrough

- `refresh()` sends `expiresInMin` instead of `expiresInMins` → the server ignores the parameter,
  so the new `accessToken` lives the default 60 min, not 1.
- If you open **resources** without logging in, the interceptor sends `Bearer undefined` → 401,
  `refresh()` fails too (there is no `refreshToken`), and this error is not handled anywhere (`Uncaught (in promise)`).
- The interceptor adds the token only to GET requests — `login` and `refresh` (POST) don't need a token.
- The name `retriveLocalStorage` has a typo (`retrieve`).
