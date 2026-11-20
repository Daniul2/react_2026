import {createContext} from 'react';
import type {Theme} from '../models/Theme.ts';

export interface IThemeContext {
    theme: Theme;
    toggleTheme: () => void;
}

// null by default — so useTheme() can detect that a component is outside <ThemeProvider>
export const ThemeContext = createContext<IThemeContext | null>(null);
