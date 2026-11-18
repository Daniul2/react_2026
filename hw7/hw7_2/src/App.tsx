// Хуки React: useState — стан, useMemo — кешувати ЗНАЧЕННЯ, useCallback — кешувати ФУНКЦІЮ
import {useCallback, useMemo, useState} from 'react';
// Великий масив користувачів
import {users} from './data/users.ts';
// Список, обгорнутий у memo
import {UserList} from './components/UserList.tsx';

const App = () => {
    // Лічильник, НЕ пов'язаний зі списком — ним перевіряємо, що зайвих ререндерів немає
    const [counter, setCounter] = useState(0);
    // Рядок пошуку — від нього залежить відфільтрований список
    const [query, setQuery] = useState('');
    // id виділеного користувача (null — нікого)
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // useMemo: функція виконується тільки коли змінився query.
    // Натискання "+1" ререндерить App, але фільтр/сортування НЕ перераховуються,
    // і повертається ТОЙ САМИЙ масив (те саме посилання) → memo(UserList) бачить "пропс не змінився"
    const filteredUsers = useMemo(() => {
        // Лог, щоб бачити, коли обчислення справді відбувається
        console.log('🧮 useMemo: фільтрую і сортую для query =', JSON.stringify(query));
        // Нормалізуємо рядок пошуку один раз
        const q = query.trim().toLowerCase();
        // Фільтр по імені + сортування за віком; toSorted не мутує вихідний масив
        return users
            .filter(user => user.name.toLowerCase().includes(q))
            .toSorted((a, b) => a.age - b.age);
    }, [query]); // ← масив залежностей: перерахувати лише коли змінився query

    // useCallback: та сама функція між рендерами (порожні залежності — вона нічого не читає ззовні,
    // бо setSelectedId від React і так стабільний). Без useCallback кожен рендер App створював би
    // нову функцію → memo(UserList) і memo(UserItem) бачили б новий пропс і ререндерились
    const handleSelect = useCallback((id: number) => {
        // Записуємо вибраний id у стан
        setSelectedId(id);
    }, []);

    // Розмітка сторінки
    return (
        <main className="mx-auto max-w-2xl p-6">
            {/* Заголовок і підказка відкрити консоль */}
            <h1 className="mb-1 text-2xl font-bold">memo · useMemo · useCallback</h1>
            <p className="mb-4 text-sm text-slate-500">Відкрий консоль (F12) і натискай «+1», потім друкуй у пошук.</p>

            {/* Блок лічильника: міняє стан App, але не зачіпає список */}
            <div className="mb-4 flex items-center gap-3">
                {/* Функціональне оновлення — беремо попереднє значення */}
                <button
                    type="button"
                    onClick={() => setCounter(prev => prev + 1)}
                    className="cursor-pointer rounded bg-slate-800 px-3 py-1 text-white"
                >
                    +1
                </button>
                {/* Поточне значення лічильника */}
                <span>counter: {counter}</span>
            </div>

            {/* Контрольоване поле пошуку: кожен символ → новий query → useMemo перераховує */}
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Пошук за іменем…"
                className="mb-2 w-full rounded border border-slate-300 bg-white px-3 py-2"
            />

            {/* Скільки знайдено і хто виділений */}
            <p className="mb-2 text-sm">
                Знайдено: {filteredUsers.length} · виділено id: {selectedId ?? '—'}
            </p>

            {/* Список отримує стабільні пропси: масив з useMemo і функцію з useCallback */}
            <UserList users={filteredUsers} selectedId={selectedId} onSelect={handleSelect}/>
        </main>
    );
};

// Експорт за замовчуванням — його імпортує main.tsx
export default App;
