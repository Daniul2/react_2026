// Outlet — a "hole" in the markup where React Router inserts the element of the current child route.
import {Outlet} from "react-router-dom";
// Our menu component with links (default export, so it is imported without curly braces).
import Menu from "../components/menu/Menu.tsx";

// Layout component. It is the element of the parent route "/" in routes.tsx,
// so it renders on ANY page of the app.
export const MainLayout = () => {
    return (
        // <>...</> — fragment: groups several elements without an extra div in the DOM.
        <>
            {/* Menu is always on top. */}
            <Menu/>
            {/* HomePage / LoginPage / AuthResourcesPage is inserted here depending on the url. */}
            <Outlet/>
        </>
    );
};
