// configureStore — Redux Toolkit function that creates the store (with devtools and thunk middleware included).
import {configureStore} from '@reduxjs/toolkit';
// Users slice.
import {usersSlice} from './slices/usersSlice.ts';
// Posts slice.
import {postsSlice} from './slices/postsSlice.ts';
// Comments slice.
import {commentsSlice} from './slices/commentsSlice.ts';

// The single app store.
export const store = configureStore({
    // Each key is a separate "branch" of the state, handled by its own reducer.
    reducer: {
        // state.usersSlice — users state.
        usersSlice: usersSlice.reducer,
        // state.postsSlice — posts state.
        postsSlice: postsSlice.reducer,
        // state.commentsSlice — comments state.
        commentsSlice: commentsSlice.reducer,
    },
});

// Type of the whole store state — inferred from the reducers (for useAppSelector and selectors).
export type RootState = ReturnType<typeof store.getState>;
// Type of the dispatch function — knows about thunks (for useAppDispatch).
export type AppDispatch = typeof store.dispatch;
