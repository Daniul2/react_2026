// Точка входу застосунку: цей файл підключається в index.html через <script type="module" src="/src/main.tsx">.

// Імпортуємо функцію createRoot з React DOM — вона створює "корінь", у який React рендерить увесь застосунок.
import {createRoot} from 'react-dom/client'
// Підключаємо глобальні стилі (директиви Tailwind). Vite сам вставить цей CSS у сторінку.
import './index.css'
// RouterProvider — компонент, який "вмикає" роутинг: слухає адресний рядок і показує потрібну сторінку.
import {RouterProvider} from "react-router-dom";
// Імпортуємо наш об'єкт роутера (опис усіх маршрутів) з файлу routes.tsx.
import {routes} from "./routes/routes.tsx";

// 1) document.getElementById('root') — знаходимо в index.html <div id="root"></div>.
//    "!" (non-null assertion) каже TypeScript: "елемент точно існує, не null".
// 2) createRoot(...) — робимо з цього div корінь React.
// 3) .render(<RouterProvider router={routes}/>) — рендеримо роутер; далі він сам вирішує, що показати за поточним url.
createRoot(document.getElementById('root')!).render(<RouterProvider router={routes}/>);
