import { useContext, useEffect } from "react";
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";
import { ThemeContext } from "../../contexts/ThemeContext";

interface IUseThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
    theme: Theme;
}

const useTheme = (): IUseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme: IUseThemeResult["toggleTheme"] = (saveAction) => {
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
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        saveAction?.(newTheme);
    };

    useEffect(() => {
        if (theme) {
            document.body.className = theme;
        }
    }, [theme]);

    return { theme: theme ?? Theme.Light, toggleTheme };
};

export default useTheme;
