import type {IDummyResponse} from './IDummyResponse.ts';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

export interface IUsersResponse extends IDummyResponse {
    users: IUser[];
}
