import {createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from './store.ts';
import type {LoadStatus} from '../models/LoadStatus.ts';

// createAsyncThunk, який уже знає тип стору і тип помилки (рядок)
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    rejectValue: string;
}>();

// Чи треба йти в API: даних ще немає (idle) або минулий запит упав (failed).
// Якщо дані вже є (succeeded) або запит уже летить (loading) — запит не потрібен.
export const shouldLoad = (status: LoadStatus): boolean => status === 'idle' || status === 'failed';
