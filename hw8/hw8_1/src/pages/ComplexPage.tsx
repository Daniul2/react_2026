// useEffect — to start loading after render; useState — for the page's local state.
import {useEffect, useState} from 'react';
// Typed dispatch — to run thunks.
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
// Typed selector — to read data from the store.
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
// Users slice actions (thunk loadUsers).
import {usersSliceActions} from '../redux/slices/usersSlice.ts';
// Posts slice actions (thunk loadPosts).
import {postsSliceActions} from '../redux/slices/postsSlice.ts';
// Comments slice actions (thunk loadComments).
import {commentsSliceActions} from '../redux/slices/commentsSlice.ts';
// Selectors: statuses of the three slices and the ready "user → posts → comments" tree.
import {selectLoadStatuses, selectUsersWithPostsAndComments} from '../redux/selectors/complexSelectors.ts';
// State components: loading text and error block.
import {ErrorMessage, Loading} from '../components/StatusView.tsx';
// Card of one user with posts and comments.
import {UserWithPosts} from '../components/UserWithPosts.tsx';

// ComplexPage (/complex): renders users, each with their posts, each post with its comments.
// Takes the data from the store; if something is missing in the store — loads only what is missing.
export const ComplexPage = () => {
    // dispatch function to run the thunks.
    const dispatch = useAppDispatch();
    // Slice statuses {users, posts, comments} — to know whether everything is loaded.
    const statuses = useAppSelector(selectLoadStatuses);
    // Ready tree of users with posts and comments (built by the selector from the store).
    const users = useAppSelector(selectUsersWithPostsAndComments);
    // Error texts of the three slices joined into one string with "; " (empty ones are dropped).
    const errors = useAppSelector(state =>
        [state.usersSlice.error, state.postsSlice.error, state.commentsSlice.error].filter(Boolean).join('; '));

    // Remember what was in the store at the moment of entering the page — to show where the data came from.
    // useState keeps only the first value, so statusesOnEnter does not change afterwards.
    const [statusesOnEnter] = useState(statuses);

    // id of the user selected in the filter, or 'all' — show everyone.
    const [selectedUserId, setSelectedUserId] = useState<number | 'all'>('all');

    // Starts loading all three data sets.
    const loadMissing = () => {
        // Every thunk has a condition: whatever is already in the store is NOT fetched from the API again.
        // So only the missing data is loaded here (e.g. if only /users was visited).
        dispatch(usersSliceActions.loadUsers());
        dispatch(postsSliceActions.loadPosts());
        dispatch(commentsSliceActions.loadComments());
    };

    // After the first render, load the missing data.
    useEffect(loadMissing, [dispatch]);

    // Array of the three statuses — for the checks below.
    const all = Object.values(statuses);
    // At least one request failed — show the errors and a retry button (retries only the failed requests).
    if (all.includes('failed')) return <ErrorMessage message={errors} onRetry={loadMissing}/>;
    // Not all three data sets are in the store yet — show the loading text.
    if (!all.every(status => status === 'succeeded')) return <Loading/>;

    // Users to show: all of them or only the one selected in the filter.
    const visibleUsers = selectedUserId === 'all' ? users : users.filter(user => user.id === selectedUserId);

    return (
        // Page wrapper.
        <section>
            {/* Page heading. */}
            <h1 className="mb-1 text-2xl font-bold">Complex: user → posts → comments</h1>

            {/* Badges: where the data of every slice came from. */}
            <p className="mb-4 flex flex-wrap gap-2 text-xs">
                {/* Render a badge for every slice (users, posts, comments). */}
                {(Object.keys(statusesOnEnter) as (keyof typeof statusesOnEnter)[]).map(key => {
                    // Was the data already in the store before entering the page?
                    const fromStore = statusesOnEnter[key] === 'succeeded';
                    return (
                        // Green badge — from the store, yellow — loaded from the API.
                        <span key={key} className={`rounded px-2 py-0.5 ${fromStore ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {/* Slice name and data source. */}
                            {key}: {fromStore ? 'taken from the store' : 'loaded from the API'}
                        </span>
                    );
                })}
            </p>

            {/* Filter by user. */}
            <label className="mb-4 flex items-center gap-2 text-sm">
                User:
                <select
                    // Current value — the selected id or 'all'.
                    value={selectedUserId}
                    // On change: keep 'all' as a string, otherwise convert the id to a number.
                    onChange={event => setSelectedUserId(event.target.value === 'all' ? 'all' : Number(event.target.value))}
                    className="rounded border border-slate-300 bg-white px-2 py-1"
                >
                    {/* "Show all" option with the number of users. */}
                    <option value="all">All ({users.length})</option>
                    {/* One option for every user. */}
                    {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
            </label>

            {/* List of user cards. */}
            <div className="flex flex-col gap-4">
                {/* A card with posts and comments for every visible user. */}
                {visibleUsers.map(user => <UserWithPosts key={user.id} user={user}/>)}
            </div>
        </section>
    );
};
