import {createBrowserRouter, Navigate} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {HomePage} from '../pages/HomePage.tsx';
import {UsersJsonPlaceholderPage} from '../pages/UsersJsonPlaceholderPage.tsx';
import {UsersDummyJsonPage} from '../pages/UsersDummyJsonPage.tsx';
import {PostsJsonPlaceholderPage} from '../pages/PostsJsonPlaceholderPage.tsx';
import {PostsDummyJsonPage} from '../pages/PostsDummyJsonPage.tsx';
import {CommentsJsonPlaceholderPage} from '../pages/CommentsJsonPlaceholderPage.tsx';
import {CommentsDummyJsonPage} from '../pages/CommentsDummyJsonPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {
                path: 'users',
                children: [
                    {index: true, element: <Navigate to="jsonplaceholder" replace/>},
                    {path: 'jsonplaceholder', element: <UsersJsonPlaceholderPage/>},
                    {path: 'dummyjson', element: <UsersDummyJsonPage/>},
                ],
            },
            {
                path: 'posts',
                children: [
                    {index: true, element: <Navigate to="jsonplaceholder" replace/>},
                    {path: 'jsonplaceholder', element: <PostsJsonPlaceholderPage/>},
                    {path: 'dummyjson', element: <PostsDummyJsonPage/>},
                ],
            },
            {
                path: 'comments',
                children: [
                    {index: true, element: <Navigate to="jsonplaceholder" replace/>},
                    {path: 'jsonplaceholder', element: <CommentsJsonPlaceholderPage/>},
                    {path: 'dummyjson', element: <CommentsDummyJsonPage/>},
                ],
            },
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
