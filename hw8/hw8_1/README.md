# ДЗ 8 — Redux Toolkit: users / posts / comments + маршрут `/complex`

**Завдання:** створити стейт для постів і коментарів (jsonplaceholder), зробити відповідні роути.
Маршрут `/complex` показує юзера + його пости + коментарі до кожного поста. Дані беруться зі стору,
а якщо чогось у сторі ще немає — сторінка сама довантажує лише те, чого бракує.

## Роути

| Шлях        | Що показує                                   |
|-------------|----------------------------------------------|
| `/users`    | юзери (`usersSlice`)                         |
| `/posts`    | пости (`postsSlice`)                         |
| `/comments` | коментарі (`commentsSlice`)                  |
| `/complex`  | юзер → його пости → коментарі поста          |

## Як працює «не тягнути зайвий раз з API»

У кожному слайсі стан має вигляд `{items, status, error}`, де `status`: `idle | loading | succeeded | failed`.

Кожен `createAsyncThunk` має опцію **`condition`**:

```ts
condition: (_, {getState}) => shouldLoad(getState().postsSlice.status) // idle або failed
```

`condition` виконується **до** запиту. Якщо дані вже є (`succeeded`) або запит уже летить (`loading`),
thunk не стартує взагалі: немає ні `pending`, ні `fetch`. Тому:

- `/complex` просто робить `dispatch` усіх трьох thunk-ів. Те, що вже у сторі, з API повторно не береться.
  Довантажується лише відсутнє (наприклад, якщо до цього відкривали тільки `/users`).
- Повернення на `/users`, `/posts`, `/comments` теж не робить повторних запитів.
- Подвійний `useEffect` у `StrictMode` не дає двох запитів, бо другий виклик бачить `loading`.
- Після помилки (`failed`) можна повторити запит кнопкою «Спробувати ще».

На `/complex` бейджі показують, що було **взято зі стору**, а що **довантажено з API**. У меню є індикатор:
які слайси вже заповнені.

## Збирання дерева user → posts → comments

`src/redux/selectors/complexSelectors.ts` — `createSelector`:
- пости й коментарі групуються в `Map` за `userId` / `postId` (без `filter` у циклі);
- результат мемоізований: поки дані у сторі не змінились, компонент отримує той самий масив.

## Структура

```
src/
  constants/urls.ts            — ендпоінти jsonplaceholder
  models/                      — IUser, IPost, IComment, LoadStatus
  services/api.service.ts      — fetch + перевірка response.ok
  redux/
    store.ts                   — configureStore, RootState, AppDispatch
    createAppAsyncThunk.ts     — типізований createAsyncThunk + shouldLoad
    slices/                    — usersSlice, postsSlice, commentsSlice
    selectors/                 — selectUsersWithPostsAndComments, selectLoadStatuses
    hooks/                     — useAppDispatch, useAppSelector
  pages/                       — Users, Posts, Comments, Complex, NotFound
  components/                  — Menu, StoreIndicator, UserWithPosts, StatusView
  router/router.tsx
```

## Запуск

```bash
npm install
npm run dev
```
