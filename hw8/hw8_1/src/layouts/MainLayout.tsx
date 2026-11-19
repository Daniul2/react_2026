import {Outlet} from 'react-router';
import {Menu} from '../components/Menu.tsx';

export const MainLayout = () => {
    return (
        <>
            <Menu/>
            <main className="mx-auto max-w-4xl p-6">
                <Outlet/>
            </main>
        </>
    );
};
