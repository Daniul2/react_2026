import type {UserModel} from '../models/dummyjson/UserModel.ts';
import type {PostModel} from '../models/dummyjson/PostModel.ts';
import type {CommentModel} from '../models/dummyjson/CommentModel.ts';
import type {
    CommentsResponseModel,
    PostsResponseModel,
    UsersResponseModel
} from '../models/dummyjson/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_DUMMYJSON_URL;

// limit=0 — dummyjson віддає всі об'єкти, а не лише перші 30
const loadDummyJsonUsers = async (): Promise<UserModel[]> => {
    return await fetch(baseUrl + '/users?limit=0')
        .then(value => value.json())
        .then(({users}: UsersResponseModel) => users);
};

const loadDummyJsonPosts = async (): Promise<PostModel[]> => {
    return await fetch(baseUrl + '/posts?limit=0')
        .then(value => value.json())
        .then(({posts}: PostsResponseModel) => posts);
};

const loadDummyJsonComments = async (): Promise<CommentModel[]> => {
    return await fetch(baseUrl + '/comments?limit=0')
        .then(value => value.json())
        .then(({comments}: CommentsResponseModel) => comments);
};

export {loadDummyJsonUsers, loadDummyJsonPosts, loadDummyJsonComments};
