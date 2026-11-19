import {NavLink} from 'react-router';
import {StoreIndicator} from './StoreIndicator.tsx';

const links = [
    {to: '/users', label: 'Users'},
    {to: '/posts', label: 'Posts'},
    {to: '/comments', label: 'Comments'},
    {to: '/complex', label: 'Complex'},
];

export const Menu = () => {
    return (
        <nav className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 px-6 py-4">
            <ul className="flex flex-wrap gap-2">
                {links.map(({to, label}) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end
                            className={({isActive}) =>
                                `block rounded px-4 py-2 font-medium transition-colors ${
                                    isActive ? 'bg-white text-slate-900' : 'text-slate-200 hover:bg-slate-700'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <StoreIndicator/>
        </nav>
    );
};
