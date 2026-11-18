import {createBrowserRouter} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {HomePage} from '../pages/HomePage.tsx';
import {UsersPage} from '../pages/UsersPage.tsx';
import {PostsPage} from '../pages/PostsPage.tsx';
import {CommentsPage} from '../pages/CommentsPage.tsx';
import {ProductsPage} from '../pages/ProductsPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'users', element: <UsersPage/>},
            {path: 'posts', element: <PostsPage/>},
            {path: 'comments', element: <CommentsPage/>},
            {path: 'products', element: <ProductsPage/>},
        ],
    },
]);
