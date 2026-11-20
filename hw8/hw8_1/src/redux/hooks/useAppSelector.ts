// Standard react-redux hook to read data from the store.
import {useSelector} from 'react-redux';
// Type of the whole store state.
import type {RootState} from '../store.ts';

// Typed version of useSelector: inside the callback state already has type RootState (autocomplete and checks).
export const useAppSelector = useSelector.withTypes<RootState>();
