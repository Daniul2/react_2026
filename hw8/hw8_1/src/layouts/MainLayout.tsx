// Outlet — the place in the markup where React Router inserts the page of the current child route.
import {Outlet} from 'react-router';
// Navigation menu.
import {Menu} from '../components/Menu.tsx';

// MainLayout component: the frame of all pages — menu on top and the current page below it.
// It is the element of the parent route "/", so it renders on every page.
export const MainLayout = () => {
    // Render the markup of the component.
    return (
        // Fragment — groups the menu and main without an extra div.
        <>
            {/* Menu is always on top. */}
            <Menu/>
            {/* Width-limited, centered content area. */}
            <main className="mx-auto max-w-4xl p-6">
                {/* UsersPage / PostsPage / CommentsPage / ComplexPage is inserted here depending on the url. */}
                <Outlet/>
            </main>
        </>
    );
};
