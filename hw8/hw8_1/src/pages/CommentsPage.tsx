// useEffect — hook for side effects (here — starting data loading after render).
import {useEffect} from 'react';
// Typed dispatch — to run thunks.
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
// Typed selector — to read data from the store.
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
// Comments slice actions (thunk loadComments).
import {commentsSliceActions} from '../redux/slices/commentsSlice.ts';
// State components: loading text and error block.
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

// CommentsPage (/comments): loads comments into the store (if they are not there yet) and renders their list.
export const CommentsPage = () => {
    // Take from the store the list (items → comments), the status and the error text of the comments slice.
    const {items: comments, status, error} = useAppSelector(({commentsSlice}) => commentsSlice);
    // dispatch function to run the thunk.
    const dispatch = useAppDispatch();

    // After the first render, ask to load the comments.
    useEffect(() => {
        // If comments are already in the store — the thunk condition cancels the request and the data comes from the store.
        dispatch(commentsSliceActions.loadComments());
    }, [dispatch]); // dispatch is stable, so the effect runs once.

    // Request failed — show the error and a button that retries the request.
    if (status === 'failed') {
        // onRetry dispatches the same thunk again; error ?? '' — in case the error text is null.
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(commentsSliceActions.loadComments())}/>;
    }
    // No data yet (idle or loading) — show the loading text.
    if (status !== 'succeeded') return <Loading/>;

    // Data is in the store — render the list.
    return (
        // Page wrapper.
        <section>
            {/* Heading with the number of items. */}
            <h1 className="mb-4 text-2xl font-bold">Comments ({comments.length})</h1>
            {/* List of comments in a column. */}
            <ul className="flex flex-col gap-2">
                {/* Render a card for every comment. */}
                {comments.map(comment => (
                    // key — comment id, unique.
                    <li key={comment.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        {/* Comment id and title. */}
                        <p className="font-semibold">{comment.id}. {comment.name}</p>
                        {/* Comment text. */}
                        <p className="text-sm text-slate-600">{comment.body}</p>
                        {/* Author email and the id of the commented post. */}
                        <p className="mt-1 text-xs text-slate-400">{comment.email} · postId: {comment.postId}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
