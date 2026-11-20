// createBrowserRouter — creates a router that works with the browser address bar (History API, normal urls without #).
import {createBrowserRouter} from "react-router-dom";
// Layout — a shared wrapper for all pages: menu + a place for the page.
import {MainLayout} from "../layouts/MainLayout.tsx";
// Pages that are inserted into the layout's <Outlet/>.
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {AuthResourcesPage} from "../pages/AuthResourcesPage.tsx";


// Export the ready router to pass it to <RouterProvider router={routes}/> in main.tsx.
// The argument is an array of route objects (router object).
export const routes = createBrowserRouter([
    {
        // Parent route "/": always renders MainLayout.
        // children — child routes; their element is shown inside the layout's <Outlet/>.
        path: '/', element: <MainLayout/>, children: [
            // index: true — the "default" route for the parent path, i.e. exactly "/" → HomePage.
            {index: true, element: <HomePage/>},
            // Relative path 'login' → full address "/login" → LoginPage.
            {path: 'login', element: <LoginPage/>},
            // Here the path is absolute ("/auth/resources"). This is allowed in a child route
            // if it starts with the parent path ("/"). Equivalent to 'auth/resources'.
            {path: '/auth/resources', element: <AuthResourcesPage/>},
        ]
    }
]);
