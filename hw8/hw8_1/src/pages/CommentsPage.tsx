import {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
import {commentsSliceActions} from '../redux/slices/commentsSlice.ts';
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

export const CommentsPage = () => {
    const {items: comments, status, error} = useAppSelector(({commentsSlice}) => commentsSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(commentsSliceActions.loadComments());
    }, [dispatch]);

    if (status === 'failed') {
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(commentsSliceActions.loadComments())}/>;
    }
    if (status !== 'succeeded') return <Loading/>;

    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">Comments ({comments.length})</h1>
            <ul className="flex flex-col gap-2">
                {comments.map(comment => (
                    <li key={comment.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        <p className="font-semibold">{comment.id}. {comment.name}</p>
                        <p className="text-sm text-slate-600">{comment.body}</p>
                        <p className="mt-1 text-xs text-slate-400">{comment.email} · postId: {comment.postId}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
