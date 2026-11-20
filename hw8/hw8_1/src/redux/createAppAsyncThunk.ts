// createAsyncThunk — Redux Toolkit function for async actions (API requests).
import {createAsyncThunk} from '@reduxjs/toolkit';
// Store state type — so getState() inside thunks is typed.
import type {RootState} from './store.ts';
// Loading status type — for the shouldLoad function.
import type {LoadStatus} from '../models/LoadStatus.ts';

// createAsyncThunk that already knows the store type and the error type (string) — no generics needed in every thunk.
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    // Type of the state returned by getState().
    state: RootState;
    // Type of the value passed to rejectWithValue (error text).
    rejectValue: string;
    // End of the type parameters; withTypes returns the typed createAsyncThunk.
}>();

// Whether we need to call the API: no data yet (idle) or the previous request failed (failed).
// If the data is already there (succeeded) or the request is in flight (loading) — no request is needed.
export const shouldLoad = (status: LoadStatus): boolean => status === 'idle' || status === 'failed';
