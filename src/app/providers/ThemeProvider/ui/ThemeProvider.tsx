import { ReactNode, useEffect, useMemo, useState } from "react";
import { useJsonSettings } from "@/entities/User";
import { Theme } from "@/shared/const/theme";
import { ThemeContext } from "../../../../shared/lib/contexts/ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";

interface IThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = ({ children, initialTheme }: IThemeProviderProps) => {
    const [isThemeInitialized, setIsThemeInitialized] = useState(false);
    const { theme: defaultTheme } = useJsonSettings();

    const [theme, setTheme] = useState<Theme>(initialTheme ?? fallbackTheme ?? Theme.Light);

    useEffect(() => {
        if (!isThemeInitialized && defaultTheme) {
            setIsThemeInitialized(true);
            setTheme(defaultTheme);
        }
    }, [defaultTheme, isThemeInitialized]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme
        }),
        [theme]
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
