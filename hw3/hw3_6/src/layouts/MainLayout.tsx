import {Link, Outlet} from 'react-router';

export const MainLayout = () => {
    return (
        <>
            <header className="bg-slate-900 px-6 py-4">
                <Link to="/" className="text-white text-xl font-bold">Users & carts</Link>
            </header>
            <main className="p-6">
                <Outlet/>
            </main>
        </>
    );
};
