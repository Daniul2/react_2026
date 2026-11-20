import {useTheme} from '../hooks/useTheme.ts';

// Sits at the very bottom of the left branch — reads the same theme the button in the right branch changes
export const ThemeInfo = () => {
    const {theme} = useTheme();

    return (
        <p className="text-sm">
            Поточна тема: <b>{theme === 'dark' ? 'темна 🌙' : 'світла ☀️'}</b>
        </p>
    );
};
