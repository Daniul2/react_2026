// Comment interface — mirrors the object structure from https://jsonplaceholder.typicode.com/comments.
export interface IComment {
    // id of the post the comment belongs to — links the comment to a post (IPost.id).
    postId: number;
    // Unique comment identifier.
    id: number;
    // Comment title (name).
    name: string;
    // Email of the comment author.
    email: string;
    // Comment text.
    body: string;
}
