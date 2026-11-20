// Post interface — mirrors the object structure from https://jsonplaceholder.typicode.com/posts.
export interface IPost {
    // id of the post author — links the post to a user (IUser.id).
    userId: number;
    // Unique post identifier; comments reference it through postId.
    id: number;
    // Post title.
    title: string;
    // Post text (body).
    body: string;
}
