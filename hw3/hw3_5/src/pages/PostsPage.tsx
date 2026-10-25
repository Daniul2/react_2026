import {useEffect, useState} from 'react';
import type {PostModel} from '../models/PostModel.ts';
import {loadPosts} from '../service/api.service.ts';
import {Post} from '../components/post-component/Post.tsx';

export const PostsPage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        loadPosts().then(value => setPosts(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {posts.map(post => <Post post={post} key={post.id}/>)}
            </div>
        </div>
    );
};
