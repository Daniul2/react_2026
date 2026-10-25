import {Outlet} from 'react-router';
import {Users} from '../components/users-component/Users.tsx';

export const HomePage = () => {
    return (
        <div className="grid gap-6 md:grid-cols-[320px_1fr] items-start">
            <aside className="md:max-h-[calc(100vh-7rem)] md:overflow-y-auto pr-1">
                <Users/>
            </aside>
            <section className="md:sticky md:top-6">
                <Outlet/>
            </section>
        </div>
    );
};
