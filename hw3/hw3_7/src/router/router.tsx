import {createBrowserRouter} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {HomePage} from '../pages/HomePage.tsx';
import {CartsPage} from '../pages/CartsPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            // sibling routes: the carts page fully replaces the users list
            {index: true, element: <HomePage/>},
            {path: 'users/:userId/carts', element: <CartsPage/>},
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
