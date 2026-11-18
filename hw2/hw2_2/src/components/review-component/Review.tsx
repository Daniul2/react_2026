import type {FC} from 'react';
import type {ReviewModel} from '../../models/ReviewModel.ts';

type PropType = { review: ReviewModel };

export const Review: FC<PropType> = ({review: {rating, comment, date, reviewerName, reviewerEmail}}) => {
    return (
        <div className="bg-slate-50 rounded p-2 text-sm">
            <p><b>{reviewerName}</b> ({reviewerEmail}) — {rating} ★</p>
            <p>{comment}</p>
            <p className="text-xs text-slate-500">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
};
