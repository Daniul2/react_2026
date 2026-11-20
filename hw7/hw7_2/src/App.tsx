// React hooks: useState — state, useMemo — cache a VALUE, useCallback — cache a FUNCTION
import {useCallback, useMemo, useState} from 'react';
// Big array of users
import {users} from './data/users.ts';
// List wrapped in memo
import {UserList} from './components/UserList.tsx';

const App = () => {
    // Counter NOT related to the list — used to check there are no extra re-renders
    const [counter, setCounter] = useState(0);
    // Search string — the filtered list depends on it
    const [query, setQuery] = useState('');
    // id of the selected user (null — nobody)
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // useMemo: the function runs only when query changes.
    // Clicking "+1" re-renders App, but filtering/sorting is NOT recomputed,
    // and THE SAME array (same reference) is returned → memo(UserList) sees "prop did not change"
    const filteredUsers = useMemo(() => {
        // Log to see when the computation actually happens
        console.log('🧮 useMemo: фільтрую і сортую для query =', JSON.stringify(query));
        // Normalize the search string once
        const q = query.trim().toLowerCase();
        // Filter by name + sort by age; toSorted does not mutate the source array
        return users
            .filter(user => user.name.toLowerCase().includes(q))
            .toSorted((a, b) => a.age - b.age);
    }, [query]); // ← dependency array: recompute only when query changes

    // useCallback: the same function between renders (empty deps — it reads nothing from outside,
    // because setSelectedId from React is stable anyway). Without useCallback every App render would create
    // a new function → memo(UserList) and memo(UserItem) would see a new prop and re-render
    const handleSelect = useCallback((id: number) => {
        // Save the selected id to state
        setSelectedId(id);
    }, []);

    // Page markup
    return (
        <main className="mx-auto max-w-2xl p-6">
            {/* Heading and a hint to open the console */}
            <h1 className="mb-1 text-2xl font-bold">memo · useMemo · useCallback</h1>
            <p className="mb-4 text-sm text-slate-500">Відкрий консоль (F12) і натискай «+1», потім друкуй у пошук.</p>

            {/* Counter block: changes App state but does not touch the list */}
            <div className="mb-4 flex items-center gap-3">
                {/* Functional update — take the previous value */}
                <button
                    type="button"
                    onClick={() => setCounter(prev => prev + 1)}
                    className="cursor-pointer rounded bg-slate-800 px-3 py-1 text-white"
                >
                    +1
                </button>
                {/* Current counter value */}
                <span>counter: {counter}</span>
            </div>

            {/* Controlled search input: every character → new query → useMemo recomputes */}
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Пошук за іменем…"
                className="mb-2 w-full rounded border border-slate-300 bg-white px-3 py-2"
            />

            {/* How many were found and who is selected */}
            <p className="mb-2 text-sm">
                Знайдено: {filteredUsers.length} · виділено id: {selectedId ?? '—'}
            </p>

            {/* The list gets stable props: an array from useMemo and a function from useCallback */}
            <UserList users={filteredUsers} selectedId={selectedId} onSelect={handleSelect}/>
        </main>
    );
};

// Default export — imported by main.tsx
export default App;
