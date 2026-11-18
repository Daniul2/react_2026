import type {UsersResponseModel} from '../models/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const USERS_PER_PAGE = 30;

const loadUsers = async (page: number): Promise<UsersResponseModel> => {
    const skip = (page - 1) * USERS_PER_PAGE;
    return await fetch(`${baseUrl}/users?limit=${USERS_PER_PAGE}&skip=${skip}`)
        .then(value => value.json());
};

export {loadUsers};
