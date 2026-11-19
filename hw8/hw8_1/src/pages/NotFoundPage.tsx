import {Link} from 'react-router';

export const NotFoundPage = () => (
    <div className="p-6">
        <h1 className="mb-2 text-2xl font-bold">404 — сторінку не знайдено</h1>
        <Link to="/users" className="text-blue-600 underline">На головну</Link>
    </div>
);
