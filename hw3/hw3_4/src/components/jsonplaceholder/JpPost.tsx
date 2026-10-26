import type {FC} from 'react';
import type {PostModel} from '../../models/jsonplaceholder/PostModel.ts';

type PropType = { post: PostModel };

export const JpPost: FC<PropType> = ({post: {id, userId, title, body}}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold">{id}. {title}</h3>
            <p className="text-xs text-slate-500 mb-2">userId: {userId}</p>
            <p>{body}</p>
        </div>
    );
};
