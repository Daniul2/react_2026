import type {UserModel} from '../models/jsonplaceholder/UserModel.ts';
import type {PostModel} from '../models/jsonplaceholder/PostModel.ts';
import type {CommentModel} from '../models/jsonplaceholder/CommentModel.ts';

const baseUrl = import.meta.env.VITE_JSONPLACEHOLDER_URL;

const loadJsonPlaceholderUsers = async (): Promise<UserModel[]> => {
    return await fetch(baseUrl + '/users').then(value => value.json());
};

const loadJsonPlaceholderPosts = async (): Promise<PostModel[]> => {
    return await fetch(baseUrl + '/posts').then(value => value.json());
};

const loadJsonPlaceholderComments = async (): Promise<CommentModel[]> => {
    return await fetch(baseUrl + '/comments').then(value => value.json());
};

export {loadJsonPlaceholderUsers, loadJsonPlaceholderPosts, loadJsonPlaceholderComments};
