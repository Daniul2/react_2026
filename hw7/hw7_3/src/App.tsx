import {useState} from 'react';
import {UsersList} from './components/UsersList.tsx';
import {ProductsList} from './components/ProductsList.tsx';
import {BrokenRequest} from './components/BrokenRequest.tsx';

const tabs = {
    users: {label: 'Користувачі', Component: UsersList},
    products: {label: 'Продукти', Component: ProductsList},
    broken: {label: 'Помилка 404', Component: BrokenRequest},
};

type TabKey = keyof typeof tabs;

const App = () => {
    const [tab, setTab] = useState<TabKey>('users');
    const {Component} = tabs[tab];

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-1 text-2xl font-bold">Кастомний хук <code>useFetch&lt;T&gt;(url)</code></h1>
            <p className="mb-4 text-sm text-slate-500">Дані з dummyjson.com, кожна вкладка — окремий виклик хука з іншим типом T.</p>

            <nav className="mb-4 flex gap-2">
                {(Object.keys(tabs) as TabKey[]).map(key => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={`cursor-pointer rounded px-3 py-1 ${
                            key === tab ? 'bg-slate-800 text-white' : 'bg-white hover:bg-slate-200'
                        }`}
                    >
                        {tabs[key].label}
                    </button>
                ))}
            </nav>

            <Component/>
        </main>
    );
};

export default App;
