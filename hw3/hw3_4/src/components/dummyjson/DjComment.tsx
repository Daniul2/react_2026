import type {FC} from 'react';
import type {CommentModel} from '../../models/dummyjson/CommentModel.ts';

type PropType = { comment: CommentModel };

export const DjComment: FC<PropType> = ({comment: {id, body, postId, likes, user}}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">{id}. {user.fullName} <span className="text-slate-500 font-normal">@{user.username}</span></h3>
            <p className="my-2">{body}</p>
            <p className="text-xs text-slate-500">👍 {likes} · postId: {postId}</p>
        </div>
    );
};
