// StrictMode — React development mode: effects run twice to catch bugs.
import {StrictMode} from 'react';
// createRoot — creates the React root inside a DOM element.
import {createRoot} from 'react-dom/client';
// Provider — makes the Redux store available to all components.
import {Provider} from 'react-redux';
// RouterProvider — connects the router to the app.
import {RouterProvider} from 'react-router';
// Global styles (Tailwind).
import './index.css';
// Our Redux store.
import {store} from './redux/store.ts';
// Our router with the routes.
import {router} from './router/router.tsx';

// Find <div id="root"> from index.html (! tells TS it definitely exists) and render the app into it.
createRoot(document.getElementById('root')!).render(
    // Enable StrictMode checks.
    <StrictMode>
        {/* The store is available inside — for useAppSelector / useAppDispatch. */}
        <Provider store={store}>
            {/* The router renders the page that matches the url. */}
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
);
