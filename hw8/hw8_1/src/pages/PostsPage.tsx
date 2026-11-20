// useEffect — hook for side effects (here — starting data loading after render).
import {useEffect} from 'react';
// Typed dispatch — to run thunks.
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
// Typed selector — to read data from the store.
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
// Posts slice actions (thunk loadPosts).
import {postsSliceActions} from '../redux/slices/postsSlice.ts';
// State components: loading text and error block.
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

// PostsPage (/posts): loads posts into the store (if they are not there yet) and renders their list.
export const PostsPage = () => {
    // Take from the store the list (items → posts), the status and the error text of the posts slice.
    const {items: posts, status, error} = useAppSelector(({postsSlice}) => postsSlice);
    // dispatch function to run the thunk.
    const dispatch = useAppDispatch();

    // After the first render, ask to load the posts.
    useEffect(() => {
        // If posts are already in the store — the thunk condition cancels the request and the data comes from the store.
        dispatch(postsSliceActions.loadPosts());
    }, [dispatch]); // dispatch is stable, so the effect runs once.

    // Request failed — show the error and a button that retries the request.
    if (status === 'failed') {
        // onRetry dispatches the same thunk again; error ?? '' — in case the error text is null.
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(postsSliceActions.loadPosts())}/>;
    }
    // No data yet (idle or loading) — show the loading text.
    if (status !== 'succeeded') return <Loading/>;

    // Data is in the store — render the list.
    return (
        // Page wrapper.
        <section>
            {/* Heading with the number of items. */}
            <h1 className="mb-4 text-2xl font-bold">Posts ({posts.length})</h1>
            {/* List of posts in a column. */}
            <ul className="flex flex-col gap-2">
                {/* Render a card for every post. */}
                {posts.map(post => (
                    // key — post id, unique.
                    <li key={post.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        {/* Post id and title. */}
                        <p className="font-semibold">{post.id}. {post.title}</p>
                        {/* Post text. */}
                        <p className="text-sm text-slate-600">{post.body}</p>
                        {/* id of the post author. */}
                        <p className="mt-1 text-xs text-slate-400">userId: {post.userId}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
