import {type FC, type PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';
import {ThemeContext} from './ThemeContext.ts';
import type {Theme} from '../models/Theme.ts';

const STORAGE_KEY = 'theme';

// Стартова тема: збережена раніше → системна (prefers-color-scheme) → світла
const getInitialTheme = (): Theme => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch {
        // localStorage може бути недоступний (приватний режим тощо) — просто ігноруємо
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    // Синхронізуємо тему з <html data-theme="..."> (для фону body) і зберігаємо вибір
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // див. вище
        }
    }, [theme]);

    // Стабільна функція — не створюється заново на кожному рендері
    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    // Новий об'єкт value тільки коли змінилась тема — інакше всі споживачі ререндерились би зайвий раз
    const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

    return <ThemeContext value={value}>{children}</ThemeContext>;
};
