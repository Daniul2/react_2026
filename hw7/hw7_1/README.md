# ДЗ 7 — дерево компонентів + Context + перемикач теми

**Завдання (#GP0nA6rxivp):** зробити дерево компонентів у дві сторони (чим глибше, тим краще),
зробити контекст і кнопку, яка міняє тему зі світлої на темну.

## Дерево

```
<ThemeProvider>                      ← тримає стан theme + toggleTheme
 └─ <App>                            рівень 0
     ├─ <LeftLevel1>                 рівень 1        ├─ <RightLevel1>
     │   └─ <LeftLevel2>             рівень 2        │   └─ <RightLevel2>
     │       └─ <LeftLevel3>         рівень 3        │       └─ <RightLevel3>
     │           └─ <LeftLevel4>     рівень 4        │           └─ <RightLevel4>
     │               └─ <LeftLevel5> рівень 5        │               └─ <RightLevel5>
     │                   └─ <LeftLevel6>  рівень 6   │                   └─ <RightLevel6>
     │                       └─ <ThemeInfo/>  ◄──────┼─── читає тему        └─ <ThemeToggleButton/>  ── міняє тему
```

Кнопка внизу **правої** гілки міняє тему, а `<ThemeInfo/>` внизу **лівої** гілки одразу її показує.
Гілки ніяк не пов'язані пропсами — обидві беруть дані з одного контексту. Кожен `<TreeNode>`
теж читає тему з контексту, тому перефарбовується все дерево.

## Файли

| Файл | Що робить |
|---|---|
| `src/models/Theme.ts` | тип `'light' \| 'dark'` |
| `src/context/ThemeContext.ts` | `createContext<IThemeContext \| null>(null)` |
| `src/context/ThemeProvider.tsx` | `useState` теми, `toggleTheme` через `useCallback`, `value` через `useMemo`, збереження в `localStorage`, `data-theme` на `<html>` |
| `src/hooks/useTheme.ts` | `useContext` + помилка, якщо компонент поза провайдером |
| `src/components/TreeNode.tsx` | рамка вузла дерева, кольори залежать від теми |
| `src/components/left/LeftLevel1…6.tsx` | ліва гілка |
| `src/components/right/RightLevel1…6.tsx` | права гілка |
| `src/components/ThemeToggleButton.tsx` | кнопка перемикання теми |
| `src/components/ThemeInfo.tsx` | показує поточну тему |

## Запуск

```bash
npm install
npm run dev
```
