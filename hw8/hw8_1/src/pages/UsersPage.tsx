import {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
import {usersSliceActions} from '../redux/slices/usersSlice.ts';
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

export const UsersPage = () => {
    const {items: users, status, error} = useAppSelector(({usersSlice}) => usersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Якщо юзери вже в сторі — condition у thunk-у скасує запит
        dispatch(usersSliceActions.loadUsers());
    }, [dispatch]);

    if (status === 'failed') {
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(usersSliceActions.loadUsers())}/>;
    }
    if (status !== 'succeeded') return <Loading/>;

    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">Users ({users.length})</h1>
            <ul className="grid gap-2 sm:grid-cols-2">
                {users.map(user => (
                    <li key={user.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        <p className="font-semibold">{user.id}. {user.name} <span className="font-normal text-slate-500">@{user.username}</span></p>
                        <p className="text-sm text-slate-600">{user.email} · {user.address.city}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
