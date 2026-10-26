import {useEffect, useState} from 'react';
import type {CommentModel} from '../models/jsonplaceholder/CommentModel.ts';
import {loadJsonPlaceholderComments} from '../service/jsonplaceholder.service.ts';
import {JpComment} from '../components/jsonplaceholder/JpComment.tsx';

export const CommentsJsonPlaceholderPage = () => {
    const [comments, setComments] = useState<CommentModel[]>([]);

    useEffect(() => {
        loadJsonPlaceholderComments().then(value => setComments(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Comments · JSONPlaceholder</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {comments.map(comment => <JpComment comment={comment} key={comment.id}/>)}
            </div>
        </div>
    );
};
