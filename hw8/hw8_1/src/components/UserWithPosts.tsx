import type {FC} from 'react';
import type {IUserWithPosts} from '../redux/selectors/complexSelectors.ts';

export const UserWithPosts: FC<{user: IUserWithPosts}> = ({user}) => (
    <article className="rounded-lg bg-white p-4 shadow-sm">
        <header className="mb-3 border-b border-slate-200 pb-2">
            <h2 className="text-lg font-semibold">{user.name} <span className="font-normal text-slate-500">@{user.username}</span></h2>
            <p className="text-sm text-slate-600">{user.email} · {user.address.city} · {user.company.name}</p>
        </header>

        <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Пости ({user.posts.length})</h3>
        <ul className="flex flex-col gap-2">
            {user.posts.map(post => (
                <li key={post.id} className="rounded border border-slate-200">
                    <details>
                        <summary className="cursor-pointer px-3 py-2 font-medium hover:bg-slate-50">
                            {post.title} <span className="text-xs font-normal text-slate-400">· коментарів: {post.comments.length}</span>
                        </summary>
                        <div className="px-3 pb-3">
                            <p className="mb-2 text-sm text-slate-700">{post.body}</p>
                            <ul className="flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                                {post.comments.map(comment => (
                                    <li key={comment.id} className="text-sm">
                                        <b>{comment.name}</b> <span className="text-xs text-slate-400">{comment.email}</span>
                                        <p className="text-slate-600">{comment.body}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </li>
            ))}
        </ul>
    </article>
);
