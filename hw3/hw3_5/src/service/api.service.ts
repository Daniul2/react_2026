import type {UserModel} from '../models/UserModel.ts';
import type {PostModel} from '../models/PostModel.ts';
import type {PostsResponseModel, UsersResponseModel} from '../models/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// без параметрів — api віддає перший пул (30 об'єктів)
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
