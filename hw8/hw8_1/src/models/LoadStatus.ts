// Type of the data loading status in a slice. Possible values:
// idle — not loaded yet; loading — request in progress; succeeded — data is in the store; failed — error.
export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// Common state "shape" for every data slice (users / posts / comments).
// T — type of one list item (IUser, IPost or IComment).
export interface IListState<T> {
    // Array of loaded items (empty until the data arrives).
    items: T[];
    // Current loading status (see LoadStatus above).
    status: LoadStatus;
    // Error text if the request failed; null — no error.
    error: string | null;
}
