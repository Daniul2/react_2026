import {useTheme} from '../hooks/useTheme.ts';

// Лежить у самому низу лівої гілки — читає ту саму тему, яку змінює кнопка з правої гілки
export const ThemeInfo = () => {
    const {theme} = useTheme();

    return (
        <p className="text-sm">
            Поточна тема: <b>{theme === 'dark' ? 'темна 🌙' : 'світла ☀️'}</b>
        </p>
    );
};
