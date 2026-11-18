import {createBrowserRouter, Navigate} from 'react-router';
import App from '../App.tsx';
import {CarsPage} from '../pages/CarsPage.tsx';
import {CreateCarPage} from '../pages/CreateCarPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <Navigate to="cars" replace/>},
            {path: 'cars', element: <CarsPage/>},
            {path: 'cars/create', element: <CreateCarPage/>},
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]);
