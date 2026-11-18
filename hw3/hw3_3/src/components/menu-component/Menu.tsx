import {NavLink} from 'react-router';

const menu = [
    {
        title: 'Users',
        links: [{to: '/users/jsonplaceholder', label: 'JSONPlaceholder'}, {to: '/users/dummyjson', label: 'DummyJSON'}],
    },
    {
        title: 'Posts',
        links: [{to: '/posts/jsonplaceholder', label: 'JSONPlaceholder'}, {to: '/posts/dummyjson', label: 'DummyJSON'}],
    },
    {
        title: 'Comments',
        links: [{to: '/comments/jsonplaceholder', label: 'JSONPlaceholder'}],
    },
];

export const Menu = () => {
    return (
        <nav className="bg-slate-900 px-6 py-4">
            <ul className="flex flex-wrap gap-8">
                {menu.map(({title, links}) => (
                    <li key={title}>
                        <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">{title}</p>
                        <ul className="flex gap-1">
                            {links.map(({to, label}) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        className={({isActive}) =>
                                            `block rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                                isActive ? 'bg-white text-slate-900' : 'text-slate-200 hover:bg-slate-700'
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
