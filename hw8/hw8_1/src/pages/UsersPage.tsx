// useEffect — hook for side effects (here — starting data loading after render).
import {useEffect} from 'react';
// Typed dispatch — to run thunks.
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
// Typed selector — to read data from the store.
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
// Users slice actions (thunk loadUsers).
import {usersSliceActions} from '../redux/slices/usersSlice.ts';
// State components: loading text and error block.
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

// UsersPage (/users): loads users into the store (if they are not there yet) and renders their list.
export const UsersPage = () => {
    // Take from the store the list (items → users), the status and the error text of the users slice.
    const {items: users, status, error} = useAppSelector(({usersSlice}) => usersSlice);
    // dispatch function to run the thunk.
    const dispatch = useAppDispatch();

    // After the first render, ask to load the users.
    useEffect(() => {
        // If users are already in the store — the thunk condition cancels the request and the data comes from the store.
        dispatch(usersSliceActions.loadUsers());
    }, [dispatch]); // dispatch is stable, so the effect runs once.

    // Request failed — show the error and a button that retries the request.
    if (status === 'failed') {
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(usersSliceActions.loadUsers())}/>;
    }
    // No data yet (idle or loading) — show the loading text.
    if (status !== 'succeeded') return <Loading/>;

    // Data is in the store — render the list.
    return (
        // Page wrapper.
        <section>
            {/* Heading with the number of items. */}
            <h1 className="mb-4 text-2xl font-bold">Users ({users.length})</h1>
            {/* Card grid: 1 column on mobile, 2 on wider screens. */}
            <ul className="grid gap-2 sm:grid-cols-2">
                {/* Render a card for every user. */}
                {users.map(user => (
                    // key — user id, unique.
                    <li key={user.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        {/* id, name and nickname. */}
                        <p className="font-semibold">{user.id}. {user.name} <span className="font-normal text-slate-500">@{user.username}</span></p>
                        {/* Email and city. */}
                        <p className="text-sm text-slate-600">{user.email} · {user.address.city}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
