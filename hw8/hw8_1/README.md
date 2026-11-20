# Homework 8 — Redux Toolkit: users / posts / comments + `/complex` route

**Task:** create state for posts and comments (jsonplaceholder) and the matching routes.
The `/complex` route shows a user + their posts + the comments of each post. The data is taken from the store,
and if something is not in the store yet, the page loads only what is missing.

## Routes

| Path        | What it shows                                  |
|-------------|------------------------------------------------|
| `/users`    | users (`usersSlice`)                           |
| `/posts`    | posts (`postsSlice`)                           |
| `/comments` | comments (`commentsSlice`)                     |
| `/complex`  | user → their posts → comments of each post     |

## How "no extra API requests" works

Every slice has the state `{items, status, error}`, where `status` is `idle | loading | succeeded | failed`.

Every `createAsyncThunk` has a **`condition`** option:

```ts
condition: (_, {getState}) => shouldLoad(getState().postsSlice.status) // idle or failed
```

`condition` runs **before** the request. If the data is already there (`succeeded`) or the request is already in flight (`loading`),
the thunk does not start at all: no `pending`, no `fetch`. That is why:

- `/complex` simply dispatches all three thunks. Whatever is already in the store is not fetched from the API again;
  only the missing data is loaded (for example, if only `/users` was opened before).
- Going back to `/users`, `/posts`, `/comments` does not send repeated requests either.
- The double `useEffect` in `StrictMode` does not cause two requests, because the second call sees `loading`.
- After an error (`failed`) the request can be retried with the "Try again" button.

On `/complex` the badges show which data was **taken from the store** and which was **loaded from the API**. The menu has an indicator
showing which slices are already filled.

## Building the user → posts → comments tree

`src/redux/selectors/complexSelectors.ts` — `createSelector`:
- posts and comments are grouped into a `Map` by `userId` / `postId` (no `filter` inside a loop);
- the result is memoized: while the store data does not change, the component gets the same array.

## Structure

```
src/
  constants/urls.ts            — jsonplaceholder endpoints
  models/                      — IUser, IPost, IComment, LoadStatus
  services/api.service.ts      — fetch + response.ok check
  redux/
    store.ts                   — configureStore, RootState, AppDispatch
    createAppAsyncThunk.ts     — typed createAsyncThunk + shouldLoad
    slices/                    — usersSlice, postsSlice, commentsSlice
    selectors/                 — selectUsersWithPostsAndComments, selectLoadStatuses
    hooks/                     — useAppDispatch, useAppSelector
  pages/                       — Users, Posts, Comments, Complex, NotFound
  components/                  — Menu, StoreIndicator, UserWithPosts, StatusView
  router/router.tsx
```

## Getting started

```bash
npm install
npm run dev
```
