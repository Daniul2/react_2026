import {urls} from '../constants/urls.ts';
import type {IUser} from '../models/IUser.ts';
import type {IPost} from '../models/IPost.ts';
import type {IComment} from '../models/IComment.ts';

const getJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    // fetch не кидає помилку на 404/500 — перевіряємо самі
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
    }
    return response.json() as Promise<T>;
};

export const apiService = {
    getUsers: () => getJson<IUser[]>(urls.users),
    getPosts: () => getJson<IPost[]>(urls.posts),
    getComments: () => getJson<IComment[]>(urls.comments),
};

export const getErrorMessage = (error: unknown): string =>
    error instanceof Error ? error.message : String(error);
