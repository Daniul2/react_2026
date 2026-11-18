import type {UserModel} from './UserModel.ts';

export interface UsersResponseModel {
    users: UserModel[];
    total: number;
    skip: number;
    limit: number;
}
