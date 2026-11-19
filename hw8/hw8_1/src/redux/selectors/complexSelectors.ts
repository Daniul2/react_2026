import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../store.ts';
import type {IUser} from '../../models/IUser.ts';
import type {IPost} from '../../models/IPost.ts';
import type {IComment} from '../../models/IComment.ts';

export interface IPostWithComments extends IPost {
    comments: IComment[];
}

export interface IUserWithPosts extends IUser {
    posts: IPostWithComments[];
}

const selectUsers = (state: RootState) => state.usersSlice.items;
const selectPosts = (state: RootState) => state.postsSlice.items;
const selectComments = (state: RootState) => state.commentsSlice.items;

// Групуємо масив у Map за ключем — щоб не робити filter у циклі (O(n) замість O(n*m))
const groupBy = <T, K>(items: T[], getKey: (item: T) => K): Map<K, T[]> => {
    const map = new Map<K, T[]>();
    for (const item of items) {
        const key = getKey(item);
        const group = map.get(key);
        if (group) group.push(item);
        else map.set(key, [item]);
    }
    return map;
};

/**
 * Юзер + його пости + коментарі кожного поста — зібрано ЛИШЕ з даних стору.
 * createSelector мемоізує результат: поки users/posts/comments у сторі ті самі,
 * повертається той самий масив, і компонент не перераховує дерево на кожен рендер.
 */
export const selectUsersWithPostsAndComments = createSelector(
    [selectUsers, selectPosts, selectComments],
    (users, posts, comments): IUserWithPosts[] => {
        const commentsByPost = groupBy(comments, comment => comment.postId);
        const postsByUser = groupBy(posts, post => post.userId);

        return users.map(user => ({
            ...user,
            posts: (postsByUser.get(user.id) ?? []).map(post => ({
                ...post,
                comments: commentsByPost.get(post.id) ?? [],
            })),
        }));
    },
);

// Статуси всіх трьох слайсів одним об'єктом (для меню і сторінки /complex)
export const selectLoadStatuses = createSelector(
    [
        (state: RootState) => state.usersSlice.status,
        (state: RootState) => state.postsSlice.status,
        (state: RootState) => state.commentsSlice.status,
    ],
    (users, posts, comments) => ({users, posts, comments}),
);
