import {useEffect, useState} from 'react';
import type {PostModel} from '../models/jsonplaceholder/PostModel.ts';
import {loadJsonPlaceholderPosts} from '../service/jsonplaceholder.service.ts';
import {JpPost} from '../components/jsonplaceholder/JpPost.tsx';

export const PostsJsonPlaceholderPage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        loadJsonPlaceholderPosts().then(value => setPosts(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts · JSONPlaceholder</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {posts.map(post => <JpPost post={post} key={post.id}/>)}
            </div>
        </div>
    );
};
