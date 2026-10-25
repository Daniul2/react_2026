import {NavLink} from 'react-router';

const links = [
    {to: '/users', label: 'Users'},
    {to: '/posts', label: 'Posts'},
];

export const Menu = () => {
    return (
        <nav className="bg-slate-900 px-6 py-4">
            <ul className="flex gap-2">
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
        </nav>
    );
};
