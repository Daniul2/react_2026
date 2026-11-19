import {createSlice} from '@reduxjs/toolkit';
import type {IPost} from '../../models/IPost.ts';
import type {IListState} from '../../models/LoadStatus.ts';
import {apiService, getErrorMessage} from '../../services/api.service.ts';
import {createAppAsyncThunk, shouldLoad} from '../createAppAsyncThunk.ts';

const initialState: IListState<IPost> = {items: [], status: 'idle', error: null};

const loadPosts = createAppAsyncThunk(
    'postsSlice/loadPosts',
    async (_: void, {rejectWithValue}) => {
        try {
            return await apiService.getPosts();
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    },
    {
        // condition виконується ДО запиту: false → thunk навіть не стартує (ні pending, ні fetch).
        // Тому сторінки можуть сміливо робити dispatch(loadPosts()) — з API тягнемо лише раз.
        condition: (_, {getState}) => shouldLoad(getState().postsSlice.status),
    },
);

export const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadPosts.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message ?? 'Невідома помилка';
            }),
});

export const postsSliceActions = {...postsSlice.actions, loadPosts};
