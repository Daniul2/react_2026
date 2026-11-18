import type {FC} from 'react';
import type {PostModel} from '../../models/PostModel.ts';

type PropType = { post: PostModel };

export const Post: FC<PropType> = ({post}) => {
    const {id, title, body, tags, reactions: {likes, dislikes}, views, userId} = post;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{id}. {title}</h3>
            <p>{body}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => <span key={tag} className="text-xs bg-slate-200 rounded px-2 py-1">#{tag}</span>)}
            </div>
            <p className="text-sm text-slate-500">👍 {likes} · 👎 {dislikes} · 👁 {views} · userId: {userId}</p>
        </div>
    );
};
