import {createBrowserRouter, Navigate} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {UsersPage} from '../pages/UsersPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <Navigate to="users" replace/>},
            {path: 'users', element: <UsersPage/>},
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
