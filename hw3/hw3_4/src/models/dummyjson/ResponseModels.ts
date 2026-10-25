import type {UserModel} from './UserModel.ts';
import type {PostModel} from './PostModel.ts';
import type {CommentModel} from './CommentModel.ts';

interface BaseResponseModel {
    total: number;
    skip: number;
    limit: number;
}

export interface UsersResponseModel extends BaseResponseModel {
    users: UserModel[];
}

export interface PostsResponseModel extends BaseResponseModel {
    posts: PostModel[];
}

export interface CommentsResponseModel extends BaseResponseModel {
    comments: CommentModel[];
}
