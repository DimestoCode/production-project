import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "app/providers/ThemeProvider/lib/ThemeContext";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

const useTheme = (): IUseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
        setTheme?.(theme === Theme.Dark ? Theme.Light : Theme.Dark);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    useEffect(() => {
        if (theme) {
            document.body.className = theme;
        }
    }, [theme]);

    return { theme: theme ?? Theme.Light, toggleTheme };
};

export default useTheme;
