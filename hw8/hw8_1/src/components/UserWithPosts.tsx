// FC — type of a function component with props.
import type {FC} from 'react';
// Composite type "user with posts, posts with comments".
import type {IUserWithPosts} from '../redux/selectors/complexSelectors.ts';

// Props of the UserWithPosts component.
interface IUserWithPostsProps {
    // User object with all their posts; every post has an array of comments.
    // Comes from ComplexPage (built by the selectUsersWithPostsAndComments selector).
    user: IUserWithPosts;
}

// UserWithPosts component: renders one user's card — user data, list of posts,
// and inside every post (in a collapsible block) the post text and all its comments.
export const UserWithPosts: FC<IUserWithPostsProps> = ({user}) => (
    // White user card.
    <article className="rounded-lg bg-white p-4 shadow-sm">
        {/* Card header: user data. */}
        <header className="mb-3 border-b border-slate-200 pb-2">
            {/* Name and nickname. */}
            <h2 className="text-lg font-semibold">{user.name} <span className="font-normal text-slate-500">@{user.username}</span></h2>
            {/* Email, city and company. */}
            <p className="text-sm text-slate-600">{user.email} · {user.address.city} · {user.company.name}</p>
        </header>

        {/* Posts block heading with the number of posts. */}
        <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Posts ({user.posts.length})</h3>
        {/* List of the user's posts. */}
        <ul className="flex flex-col gap-2">
            {/* Render a list item for every post. */}
            {user.posts.map(post => (
                // key — post id, unique.
                <li key={post.id} className="rounded border border-slate-200">
                    {/* <details> — native collapsible block: comments are visible only after a click. */}
                    <details>
                        {/* Visible part: post title and number of comments. Click expands the block. */}
                        <summary className="cursor-pointer px-3 py-2 font-medium hover:bg-slate-50">
                            {post.title} <span className="text-xs font-normal text-slate-400">· comments: {post.comments.length}</span>
                        </summary>
                        {/* Content that appears after expanding. */}
                        <div className="px-3 pb-3">
                            {/* Post text. */}
                            <p className="mb-2 text-sm text-slate-700">{post.body}</p>
                            {/* List of post comments with a line on the left. */}
                            <ul className="flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                                {/* Render a list item for every comment. */}
                                {post.comments.map(comment => (
                                    // key — comment id, unique.
                                    <li key={comment.id} className="text-sm">
                                        {/* Comment title and author email. */}
                                        <b>{comment.name}</b> <span className="text-xs text-slate-400">{comment.email}</span>
                                        {/* Comment text. */}
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
