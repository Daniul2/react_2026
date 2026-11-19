import {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks/useAppDispatch.ts';
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
import {postsSliceActions} from '../redux/slices/postsSlice.ts';
import {ErrorMessage, Loading} from '../components/StatusView.tsx';

export const PostsPage = () => {
    const {items: posts, status, error} = useAppSelector(({postsSlice}) => postsSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postsSliceActions.loadPosts());
    }, [dispatch]);

    if (status === 'failed') {
        return <ErrorMessage message={error ?? ''} onRetry={() => dispatch(postsSliceActions.loadPosts())}/>;
    }
    if (status !== 'succeeded') return <Loading/>;

    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">Posts ({posts.length})</h1>
            <ul className="flex flex-col gap-2">
                {posts.map(post => (
                    <li key={post.id} className="rounded bg-white px-4 py-3 shadow-sm">
                        <p className="font-semibold">{post.id}. {post.title}</p>
                        <p className="text-sm text-slate-600">{post.body}</p>
                        <p className="mt-1 text-xs text-slate-400">userId: {post.userId}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
