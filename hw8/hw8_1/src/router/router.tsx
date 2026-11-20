// createBrowserRouter — creates a router from an array of routes; Navigate — redirect component.
import {createBrowserRouter, Navigate} from 'react-router';
// Frame with the menu.
import {MainLayout} from '../layouts/MainLayout.tsx';
// Users page.
import {UsersPage} from '../pages/UsersPage.tsx';
// Posts page.
import {PostsPage} from '../pages/PostsPage.tsx';
// Comments page.
import {CommentsPage} from '../pages/CommentsPage.tsx';
// User + posts + comments page.
import {ComplexPage} from '../pages/ComplexPage.tsx';
// 404 page.
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

// App router (passed to RouterProvider in main.tsx).
export const router = createBrowserRouter([
    {
        // Parent route — the site root.
        path: '/',
        // Frame with the menu; child pages render in its <Outlet/>.
        element: <MainLayout/>,
        // What to show if an error happens while rendering the route.
        errorElement: <NotFoundPage/>,
        // Child routes.
        children: [
            // index: exact path "/" → redirect to /users right away (replace — no history entry).
            {index: true, element: <Navigate to="users" replace/>},
            // /users → list of users.
            {path: 'users', element: <UsersPage/>},
            // /posts → list of posts.
            {path: 'posts', element: <PostsPage/>},
            // /comments → list of comments.
            {path: 'comments', element: <CommentsPage/>},
            // /complex → user + their posts + post comments.
            {path: 'complex', element: <ComplexPage/>},
            // Any other path → 404.
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
