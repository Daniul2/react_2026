import {createBrowserRouter, Navigate} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {ProductsPage} from '../pages/ProductsPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <Navigate to="products" replace/>},
            {path: 'products', element: <ProductsPage/>},
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
