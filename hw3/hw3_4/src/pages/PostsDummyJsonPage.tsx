import {useEffect, useState} from 'react';
import type {PostModel} from '../models/dummyjson/PostModel.ts';
import {loadDummyJsonPosts} from '../service/dummyjson.service.ts';
import {DjPost} from '../components/dummyjson/DjPost.tsx';

export const PostsDummyJsonPage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        loadDummyJsonPosts().then(value => setPosts(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts · DummyJSON</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {posts.map(post => <DjPost post={post} key={post.id}/>)}
            </div>
        </div>
    );
};
