// Link — React Router link. Unlike <a href>, it does NOT reload the page,
// it only changes the url and re-renders the needed part (client-side navigation).
import {Link} from "react-router-dom";

// Menu component (an arrow function that returns JSX).
const Menu = () => {
    return (
        <div>
            {/* Unordered list of links. */}
            <ul>
                {/* to={'/'} — go to home (the index route → HomePage). */}
                <li><Link to={'/'}>home</Link></li>
                {/* Go to /login → LoginPage (the login happens there). */}
                <li><Link to={'/login'}>login</Link></li>
                {/* Go to /auth/resources → a page that fetches PROTECTED data (a token is required). */}
                <li><Link to={'/auth/resources'}>resources</Link></li>
            </ul>
            {/* Horizontal line to separate the menu from the page content. */}
            <hr/>

        </div>
    );
};

// Default export — that's why the import in MainLayout looks like `import Menu from ...`.
export default Menu;
