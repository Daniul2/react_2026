import type {UserModel} from '../models/UserModel.ts';
import type {PostModel} from '../models/PostModel.ts';
import type {PostsResponseModel, UsersResponseModel} from '../models/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// without params the api returns the first batch (30 objects)
const loadUsers = async (): Promise<UserModel[]> => {
    return await fetch(baseUrl + '/users')
        .then(value => value.json())
        .then(({users}: UsersResponseModel) => users);
};

const loadPosts = async (): Promise<PostModel[]> => {
    return await fetch(baseUrl + '/posts')
        .then(value => value.json())
        .then(({posts}: PostsResponseModel) => posts);
};

export {loadUsers, loadPosts};
