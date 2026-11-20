// NavLink — React Router link that knows whether it is active (matches the current url).
import {NavLink} from 'react-router';
// Store status panel shown on the right side of the menu.
import {StoreIndicator} from './StoreIndicator.tsx';

// Menu items: route path and link text.
const links = [
    // Users page.
    {to: '/users', label: 'Users'},
    // Posts page.
    {to: '/posts', label: 'Posts'},
    // Comments page.
    {to: '/comments', label: 'Comments'},
    // Complex page: user + posts + comments.
    {to: '/complex', label: 'Complex'},
];

// Menu component: renders the dark navigation bar with links to all pages
// and the store fill indicator. Has no props.
export const Menu = () => {
    return (
        // Navigation bar: links on the left, indicator on the right.
        <nav className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 px-6 py-4">
            {/* List of links. */}
            <ul className="flex flex-wrap gap-2">
                {/* For every item of the links array render an <li> with a link. */}
                {links.map(({to, label}) => (
                    // key — the path, it is unique for every item.
                    <li key={to}>
                        <NavLink
                            // Where the link leads.
                            to={to}
                            // end — active only on an exact path match.
                            end
                            // className function: isActive = true for the current page → white background.
                            className={({isActive}) =>
                                `block rounded px-4 py-2 font-medium transition-colors ${
                                    isActive ? 'bg-white text-slate-900' : 'text-slate-200 hover:bg-slate-700'
                                }`
                            }
                        >
                            {/* Link text. */}
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            {/* Indicator: which data is already in the store. */}
            <StoreIndicator/>
        </nav>
    );
};
