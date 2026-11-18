// createBrowserRouter — створює роутер, який працює з адресним рядком браузера (History API, звичайні url без #).
import {createBrowserRouter} from "react-router-dom";
// Layout (каркас) — спільна обгортка для всіх сторінок: меню + місце для сторінки.
import {MainLayout} from "../layouts/MainLayout.tsx";
// Сторінки, які будуть підставлятися в <Outlet/> лейаута.
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {AuthResourcesPage} from "../pages/AuthResourcesPage.tsx";


// Експортуємо готовий роутер, щоб передати його в <RouterProvider router={routes}/> у main.tsx.
// Аргумент — масив об'єктів-маршрутів (router object).
export const routes = createBrowserRouter([
    {
        // Батьківський маршрут "/": завжди рендерить MainLayout.
        // children — дочірні маршрути; їхні element показуються всередині <Outlet/> лейаута.
        path: '/', element: <MainLayout/>, children: [
            // index: true — маршрут "за замовчуванням" для батьківського шляху, тобто рівно "/" → HomePage.
            {index: true, element: <HomePage/>},
            // Відносний шлях 'login' → повна адреса "/login" → LoginPage.
            {path: 'login', element: <LoginPage/>},
            // Тут шлях записаний абсолютним ("/auth/resources"). У дочірньому маршруті так можна,
            // якщо він починається з шляху батька ("/"). Еквівалентно запису 'auth/resources'.
            {path: '/auth/resources', element: <AuthResourcesPage/>},
        ]
    }
]);
