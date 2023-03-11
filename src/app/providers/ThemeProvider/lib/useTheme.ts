import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "app/providers/ThemeProvider/lib/ThemeContext";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

const useTheme = (): IUseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return { theme, toggleTheme };
};

export default useTheme;
