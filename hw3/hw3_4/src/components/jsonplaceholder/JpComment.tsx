import type {FC} from 'react';
import type {CommentModel} from '../../models/jsonplaceholder/CommentModel.ts';

type PropType = { comment: CommentModel };

export const JpComment: FC<PropType> = ({comment: {id, postId, name, email, body}}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">{id}. {name}</h3>
            <p className="text-xs text-slate-500 mb-2">{email} · postId: {postId}</p>
            <p>{body}</p>
        </div>
    );
};
