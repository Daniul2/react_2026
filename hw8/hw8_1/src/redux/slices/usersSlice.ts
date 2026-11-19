import {createSlice} from '@reduxjs/toolkit';
import type {IUser} from '../../models/IUser.ts';
import type {IListState} from '../../models/LoadStatus.ts';
import {apiService, getErrorMessage} from '../../services/api.service.ts';
import {createAppAsyncThunk, shouldLoad} from '../createAppAsyncThunk.ts';

const initialState: IListState<IUser> = {items: [], status: 'idle', error: null};

const loadUsers = createAppAsyncThunk(
    'usersSlice/loadUsers',
    async (_: void, {rejectWithValue}) => {
        try {
            return await apiService.getUsers();
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    },
    {
        // condition виконується ДО запиту: false → thunk навіть не стартує (ні pending, ні fetch).
        // Тому сторінки можуть сміливо робити dispatch(loadUsers()) — з API тягнемо лише раз.
        condition: (_, {getState}) => shouldLoad(getState().usersSlice.status),
    },
);

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadUsers.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message ?? 'Невідома помилка';
            }),
});

export const usersSliceActions = {...usersSlice.actions, loadUsers};
