// Link — React Router link without a page reload.
import {Link} from 'react-router';

// NotFoundPage component: renders the "404 — page not found" message and a link to the home page.
// Shown for unknown paths and when a route fails to render.
export const NotFoundPage = () => (
    // Wrapper with padding.
    <div className="p-6">
        {/* 404 heading. */}
        <h1 className="mb-2 text-2xl font-bold">404 — page not found</h1>
        {/* Link to the users page. */}
        <Link to="/users" className="text-blue-600 underline">Go to home page</Link>
    </div>
);
