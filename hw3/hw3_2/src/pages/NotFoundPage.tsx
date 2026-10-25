import {Link} from 'react-router';

export const NotFoundPage = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">404 — сторінку не знайдено</h2>
            <Link to="/" className="text-blue-600 underline">На головну</Link>
        </div>
    );
};
