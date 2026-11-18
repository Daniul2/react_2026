import {Outlet} from 'react-router';
import {Menu} from '../components/menu-component/Menu.tsx';

export const MainLayout = () => {
    return (
        <>
            <Menu/>
            <main className="p-6">
                <Outlet/>
            </main>
        </>
    );
};
