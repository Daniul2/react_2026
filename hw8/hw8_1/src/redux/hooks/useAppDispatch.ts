// Standard react-redux hook to get dispatch.
import {useDispatch} from 'react-redux';
// Dispatch type of our store.
import type {AppDispatch} from '../store.ts';

// Typed version of useDispatch: dispatch(thunk()) returns a correctly typed result.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
