import {useEffect, useState} from 'react';
import type {CommentModel} from '../models/dummyjson/CommentModel.ts';
import {loadDummyJsonComments} from '../service/dummyjson.service.ts';
import {DjComment} from '../components/dummyjson/DjComment.tsx';

export const CommentsDummyJsonPage = () => {
    const [comments, setComments] = useState<CommentModel[]>([]);

    useEffect(() => {
        loadDummyJsonComments().then(value => setComments(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Comments · DummyJSON</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {comments.map(comment => <DjComment comment={comment} key={comment.id}/>)}
            </div>
        </div>
    );
};
