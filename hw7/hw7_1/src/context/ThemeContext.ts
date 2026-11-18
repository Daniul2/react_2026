import {createContext} from 'react';
import type {Theme} from '../models/Theme.ts';

export interface IThemeContext {
    theme: Theme;
    toggleTheme: () => void;
}

// null за замовчуванням — щоб useTheme() міг помітити, що компонент стоїть поза <ThemeProvider>
export const ThemeContext = createContext<IThemeContext | null>(null);
