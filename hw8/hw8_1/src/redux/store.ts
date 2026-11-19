import {configureStore} from '@reduxjs/toolkit';
import {usersSlice} from './slices/usersSlice.ts';
import {postsSlice} from './slices/postsSlice.ts';
import {commentsSlice} from './slices/commentsSlice.ts';

export const store = configureStore({
    reducer: {
        usersSlice: usersSlice.reducer,
        postsSlice: postsSlice.reducer,
        commentsSlice: commentsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
