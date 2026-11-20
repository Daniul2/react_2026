# HW 7 (walkthrough) — `memo`, `useMemo`, `useCallback`

**Task:** reproduce how `useCallback`, `useMemo` and `memo` are used and describe every line —
what it does and why. The comments are above/next to every line in `src/`.

## In short

| Tool | What it caches | When it recomputes | Why it is used here |
|---|---|---|---|
| `memo(Component)` | **the component's render result** | when at least one prop changes (`Object.is`) | `UserList` and `UserItem` don't re-render when "+1" is clicked |
| `useMemo(() => value, deps)` | **a value** | when `deps` change | filtering + sorting 5000 users only when `query` changes; the array keeps the same reference |
| `useCallback(fn, deps)` | **a function** (reference) | when `deps` change | `handleSelect` is the same function, so `memo` in the children works |

`memo` without `useMemo`/`useCallback` in the parent often does not work: a new array or a new arrow function
on every render is already a "different" prop.

## How to check

1. `npm install && npm run dev`, open the console.
2. Click **"+1"** → the console shows **no** new `🧮 useMemo` and `🔁 UserList render`.
3. Type into the search → both logs appear (query changed → new array → the list re-renders).
4. Click a user → only `🔁 UserList render` (`selectedId` changed), without `🧮`.
