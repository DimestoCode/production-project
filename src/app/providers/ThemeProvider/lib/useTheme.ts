import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "@/app/providers/ThemeProvider/lib/ThemeContext";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

const useTheme = (): IUseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.Dark:
                newTheme = Theme.Light;
                break;
            case Theme.Light:
                newTheme = Theme.Orange;
                break;
            case Theme.Orange:
                newTheme = Theme.Dark;
                break;
            default:
                newTheme = Theme.Light;
        }
        // const newTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
        setTheme?.(newTheme);
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
