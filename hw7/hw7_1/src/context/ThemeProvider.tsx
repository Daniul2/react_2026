import {type FC, type PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';
import {ThemeContext} from './ThemeContext.ts';
import type {Theme} from '../models/Theme.ts';

const STORAGE_KEY = 'theme';

// Initial theme: previously saved → system (prefers-color-scheme) → light
const getInitialTheme = (): Theme => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch {
        // localStorage may be unavailable (private mode etc.) — just ignore it
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    // Sync the theme with <html data-theme="..."> (for the body background) and save the choice
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // see above
        }
    }, [theme]);

    // Stable function — not recreated on every render
    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    // A new value object only when the theme changes — otherwise all consumers would re-render needlessly
    const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

    return <ThemeContext value={value}>{children}</ThemeContext>;
};
