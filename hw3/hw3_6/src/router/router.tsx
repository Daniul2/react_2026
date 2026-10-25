import {createBrowserRouter} from 'react-router';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {HomePage} from '../pages/HomePage.tsx';
import {Carts} from '../components/carts-component/Carts.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                // HomePage (список користувачів) лишається на місці,
                // а корзини рендеряться в його <Outlet/> поруч зі списком
                path: '',
                element: <HomePage/>,
                children: [
                    {index: true, element: <p className="text-slate-500">Оберіть користувача, щоб побачити його корзини.</p>},
                    {path: 'users/:userId/carts', element: <Carts/>},
                ],
            },
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
