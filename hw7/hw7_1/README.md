# HW 7 — component tree + Context + theme toggle

**Task (#GP0nA6rxivp):** build a component tree with two branches (the deeper the better),
create a context and a button that switches the theme from light to dark.

## Tree

```
<ThemeProvider>                      ← holds the theme state + toggleTheme
 └─ <App>                            level 0
     ├─ <LeftLevel1>                 level 1         ├─ <RightLevel1>
     │   └─ <LeftLevel2>             level 2         │   └─ <RightLevel2>
     │       └─ <LeftLevel3>         level 3         │       └─ <RightLevel3>
     │           └─ <LeftLevel4>     level 4         │           └─ <RightLevel4>
     │               └─ <LeftLevel5> level 5         │               └─ <RightLevel5>
     │                   └─ <LeftLevel6>  level 6    │                   └─ <RightLevel6>
     │                       └─ <ThemeInfo/>  ◄──────┼─── reads the theme   └─ <ThemeToggleButton/>  ── changes the theme
```

The button at the bottom of the **right** branch changes the theme, and `<ThemeInfo/>` at the bottom of the **left** branch shows it immediately.
The branches are not connected by props — both take the data from the same context. Every `<TreeNode>`
also reads the theme from the context, so the whole tree is repainted.

## Files

| File | What it does |
|---|---|
| `src/models/Theme.ts` | the `'light' \| 'dark'` type |
| `src/context/ThemeContext.ts` | `createContext<IThemeContext \| null>(null)` |
| `src/context/ThemeProvider.tsx` | theme `useState`, `toggleTheme` via `useCallback`, `value` via `useMemo`, saving to `localStorage`, `data-theme` on `<html>` |
| `src/hooks/useTheme.ts` | `useContext` + an error if the component is outside the provider |
| `src/components/TreeNode.tsx` | tree node frame, colors depend on the theme |
| `src/components/left/LeftLevel1…6.tsx` | left branch |
| `src/components/right/RightLevel1…6.tsx` | right branch |
| `src/components/ThemeToggleButton.tsx` | theme toggle button |
| `src/components/ThemeInfo.tsx` | shows the current theme |

## Getting started

```bash
npm install
npm run dev
```
