import {useFetch} from '../hooks/useFetch.ts';
import {urls} from '../constants/urls.ts';
import type {IUsersResponse} from '../models/IUser.ts';
import {ErrorMessage, Loading} from './StatusView.tsx';

export const UsersList = () => {
    // Один рядок замість useState + useEffect + fetch
    const state = useFetch<IUsersResponse>(urls.users);

    if (state.status === 'loading') return <Loading/>;
    if (state.status === 'error') return <ErrorMessage message={state.error}/>;

    // Тут TypeScript уже знає, що state.data: IUsersResponse
    return (
        <ul className="flex flex-col gap-1">
            {state.data.users.map(user => (
                <li key={user.id} className="rounded bg-white px-3 py-2">
                    <b>{user.firstName} {user.lastName}</b>, {user.age} р. — {user.email}
                </li>
            ))}
        </ul>
    );
};
