// createSelector — creates a memoized selector (recomputes the result only when the input data changes).
import {createSelector} from '@reduxjs/toolkit';
// Store state type — for the input selectors.
import type {RootState} from '../store.ts';
// User type — the base for IUserWithPosts.
import type {IUser} from '../../models/IUser.ts';
// Post type — the base for IPostWithComments.
import type {IPost} from '../../models/IPost.ts';
// Comment type — an item of the comments array inside a post.
import type {IComment} from '../../models/IComment.ts';

// Composite type: a post (all IPost fields) + an array of its comments.
export interface IPostWithComments extends IPost {
    // Comments of this exact post (those with postId === post id). Can be an empty array.
    comments: IComment[];
}

// Composite type: a user (all IUser fields) + an array of their posts, each already with comments.
export interface IUserWithPosts extends IUser {
    // Posts of this user (those with userId === user id), each with a comments array.
    posts: IPostWithComments[];
}

// Input selector: users array from the store.
const selectUsers = (state: RootState) => state.usersSlice.items;
// Input selector: posts array from the store.
const selectPosts = (state: RootState) => state.postsSlice.items;
// Input selector: comments array from the store.
const selectComments = (state: RootState) => state.commentsSlice.items;

// Groups an array into a Map by key — to avoid filter inside a loop (O(n) instead of O(n*m)).
// items — the array to group; getKey — a function that returns the group key of an item.
const groupBy = <T, K>(items: T[], getKey: (item: T) => K): Map<K, T[]> => {
    // Empty map: key → array of items with this key.
    const map = new Map<K, T[]>();
    // Go through every item exactly once.
    for (const item of items) {
        // Compute the item key (e.g. the post's userId).
        const key = getKey(item);
        // Look for an existing group with this key.
        const group = map.get(key);
        // Group exists — add the item to it; otherwise create a new group with one item.
        if (group) group.push(item);
        else map.set(key, [item]);
    }
    // Return the finished map of groups.
    return map;
};

/**
 * User + their posts + comments of every post — built ONLY from store data.
 * createSelector memoizes the result: while users/posts/comments in the store stay the same,
 * the same array is returned and the component does not rebuild the tree on every render.
 */
export const selectUsersWithPostsAndComments = createSelector(
    // Inputs: three arrays from the store.
    [selectUsers, selectPosts, selectComments],
    // Result function: receives these arrays and builds the tree from them.
    (users, posts, comments): IUserWithPosts[] => {
        // Comments grouped by postId: postId → comments of the post.
        const commentsByPost = groupBy(comments, comment => comment.postId);
        // Posts grouped by userId: userId → posts of the user.
        const postsByUser = groupBy(posts, post => post.userId);

        // For every user create a new object with their posts.
        return users.map(user => ({
            // Copy all user fields.
            ...user,
            // User's posts (or an empty array), each extended with its comments.
            posts: (postsByUser.get(user.id) ?? []).map(post => ({
                // Copy all post fields.
                ...post,
                // Post comments (or an empty array).
                comments: commentsByPost.get(post.id) ?? [],
            })),
        }));
    },
);

// Statuses of all three slices in one object (for the menu indicator and the /complex page).
// createSelector is needed so the object is not recreated on every render without changes.
export const selectLoadStatuses = createSelector(
    [
        // Users status.
        (state: RootState) => state.usersSlice.status,
        // Posts status.
        (state: RootState) => state.postsSlice.status,
        // Comments status.
        (state: RootState) => state.commentsSlice.status,
    ],
    // Combine the three statuses into one object {users, posts, comments}.
    (users, posts, comments) => ({users, posts, comments}),
);
