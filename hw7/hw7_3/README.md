# HW 7 (walkthrough) — custom hook `useFetch<T>(url)`

**Task (#cf69cHp):** create a custom hook that returns API responses and replaces
`useState` + `useEffect`. The endpoint is a hook argument. Think through the response typing.

## Usage

```tsx
const state = useFetch<IUsersResponse>(urls.users);

if (state.status === 'loading') return <Loading/>;
if (state.status === 'error') return <ErrorMessage message={state.error}/>;

state.data.users.map(...) // state.data: IUsersResponse — no `?.` and no `!`
```

## Typing

The hook returns `FetchState<T>` (`src/models/FetchState.ts`) — a **discriminated union** by the `status` field:

```ts
type FetchState<T> =
    | {status: 'loading'; data: null; error: null}
    | {status: 'success'; data: T;    error: null}
    | {status: 'error';   data: null; error: string};
```

Why this and not `{data: T | null; isLoading: boolean; error: string | null}`:
- "weird" combinations are impossible (`isLoading: true` together with an `error`);
- after checking `status` TypeScript narrows the type itself: in the `'success'` branch `data` has type `T`.

`T` is set by the caller. The hook does not validate the JSON at runtime, so the interfaces in `src/models/`
describe the real dummyjson response (the shared `total/skip/limit` fields are moved to `IDummyResponse`).

## What else is handled

- **`AbortController`** — when `url` changes or the component unmounts, the old request is canceled, so an old response
  can't overwrite the new one (race condition).
- **`response.ok`** — `fetch` does not throw on 404/500, so the hook checks the status itself
  (the "404 error" tab shows this).
- `catch (error: unknown)` → the `message` is extracted safely.

## Getting started

```bash
npm install
npm run dev
```
