import {createSlice} from '@reduxjs/toolkit';
import type {IComment} from '../../models/IComment.ts';
import type {IListState} from '../../models/LoadStatus.ts';
import {apiService, getErrorMessage} from '../../services/api.service.ts';
import {createAppAsyncThunk, shouldLoad} from '../createAppAsyncThunk.ts';

const initialState: IListState<IComment> = {items: [], status: 'idle', error: null};

const loadComments = createAppAsyncThunk(
    'commentsSlice/loadComments',
    async (_: void, {rejectWithValue}) => {
        try {
            return await apiService.getComments();
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    },
    {
        // condition виконується ДО запиту: false → thunk навіть не стартує (ні pending, ні fetch).
        // Тому сторінки можуть сміливо робити dispatch(loadComments()) — з API тягнемо лише раз.
        condition: (_, {getState}) => shouldLoad(getState().commentsSlice.status),
    },
);

export const commentsSlice = createSlice({
    name: 'commentsSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadComments.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message ?? 'Невідома помилка';
            }),
});

export const commentsSliceActions = {...commentsSlice.actions, loadComments};
