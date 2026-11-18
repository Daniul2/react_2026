import {useTheme} from '../hooks/useTheme.ts';

// Кнопка лежить у самому низу правої гілки, але міняє тему для всього застосунку
export const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                isDark ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
        >
            {isDark ? '☀️ Увімкнути світлу тему' : '🌙 Увімкнути темну тему'}
        </button>
    );
};
