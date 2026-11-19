import {useEffect, useState} from 'react';
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
import {usersSliceActions} from '../redux/slices/usersSlice.ts';
import {postsSliceActions} from '../redux/slices/postsSlice.ts';
import {commentsSliceActions} from '../redux/slices/commentsSlice.ts';
import {selectLoadStatuses, selectUsersWithPostsAndComments} from '../redux/selectors/complexSelectors.ts';
import {ErrorMessage, Loading} from '../components/StatusView.tsx';
import {UserWithPosts} from '../components/UserWithPosts.tsx';

export const ComplexPage = () => {
    const dispatch = useAppDispatch();
    const statuses = useAppSelector(selectLoadStatuses);
    const users = useAppSelector(selectUsersWithPostsAndComments);
    const errors = useAppSelector(state =>
        [state.usersSlice.error, state.postsSlice.error, state.commentsSlice.error].filter(Boolean).join('; '));

    // Запам'ятовуємо, що було у сторі в момент входу на сторінку — щоб показати, звідки дані
    const [statusesOnEnter] = useState(statuses);

    const [selectedUserId, setSelectedUserId] = useState<number | 'all'>('all');

    const loadMissing = () => {
        // Кожен thunk має condition: те, що вже в сторі, з API повторно НЕ тягнеться.
        // Тож тут довантажується лише те, чого бракує (наприклад, відвідали тільки /users).
        dispatch(usersSliceActions.loadUsers());
        dispatch(postsSliceActions.loadPosts());
        dispatch(commentsSliceActions.loadComments());
    };

    useEffect(loadMissing, [dispatch]);

    const all = Object.values(statuses);
    if (all.includes('failed')) return <ErrorMessage message={errors} onRetry={loadMissing}/>;
    if (!all.every(status => status === 'succeeded')) return <Loading/>;

    const visibleUsers = selectedUserId === 'all' ? users : users.filter(user => user.id === selectedUserId);

    return (
        <section>
            <h1 className="mb-1 text-2xl font-bold">Complex: user → posts → comments</h1>

            <p className="mb-4 flex flex-wrap gap-2 text-xs">
                {(Object.keys(statusesOnEnter) as (keyof typeof statusesOnEnter)[]).map(key => {
                    const fromStore = statusesOnEnter[key] === 'succeeded';
                    return (
                        <span key={key} className={`rounded px-2 py-0.5 ${fromStore ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {key}: {fromStore ? 'взято зі стору' : 'довантажено з API'}
                        </span>
                    );
                })}
            </p>

            <label className="mb-4 flex items-center gap-2 text-sm">
                Користувач:
                <select
                    value={selectedUserId}
                    onChange={event => setSelectedUserId(event.target.value === 'all' ? 'all' : Number(event.target.value))}
                    className="rounded border border-slate-300 bg-white px-2 py-1"
                >
                    <option value="all">Усі ({users.length})</option>
                    {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
            </label>

            <div className="flex flex-col gap-4">
                {visibleUsers.map(user => <UserWithPosts key={user.id} user={user}/>)}
            </div>
        </section>
    );
};
