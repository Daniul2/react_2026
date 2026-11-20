// createSlice — creates a reducer and actions for one part of the state.
import {createSlice} from '@reduxjs/toolkit';
// Type of one list item (IUser).
import type {IUser} from '../../models/IUser.ts';
// Common slice state type: {items, status, error}.
import type {IListState} from '../../models/LoadStatus.ts';
// API request service and a function that turns an error into text.
import {apiService, getErrorMessage} from '../../services/api.service.ts';
// Typed createAsyncThunk and the "do we need to load" check.
import {createAppAsyncThunk, shouldLoad} from '../createAppAsyncThunk.ts';

// Initial state: users are not loaded yet, status idle, no error.
const initialState: IListState<IUser> = {items: [], status: 'idle', error: null};

// Async action (thunk) that loads users from the API.
const loadUsers = createAppAsyncThunk(
    // Action type: loadUsers/pending, /fulfilled, /rejected are derived from it.
    'usersSlice/loadUsers',
    // Function that performs the request. The first argument is not needed (void), rejectWithValue comes from the second.
    async (_: void, {rejectWithValue}) => {
        try {
            // Success: return the array — it becomes action.payload of the fulfilled action.
            return await apiService.getUsers();
        } catch (e) {
            // Error: pass its text to action.payload of the rejected action.
            return rejectWithValue(getErrorMessage(e));
        }
    },
    {
        // condition runs BEFORE the request: false → the thunk does not start at all (no pending, no fetch).
        // So pages can safely call dispatch(loadUsers()) — the API is called only once.
        condition: (_, {getState}) => shouldLoad(getState().usersSlice.status),
    },
);

// Users slice: stores the list and its loading status.
export const usersSlice = createSlice({
    // Slice name — prefix for action types.
    name: 'usersSlice',
    // Initial state (see above).
    initialState,
    // No synchronous reducers — the state changes only through the thunk.
    reducers: {},
    // Handling of the loadUsers thunk actions.
    extraReducers: builder =>
        builder
            // Request started: set status loading and clear the previous error.
            .addCase(loadUsers.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            // Request succeeded: save the received users and set status succeeded.
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            // Request failed: status failed and the error text (from rejectWithValue or from the error itself).
            .addCase(loadUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message ?? 'Unknown error';
            }),
});

// All slice actions in one object: regular actions (none here) + the loadUsers thunk.
export const usersSliceActions = {...usersSlice.actions, loadUsers};
