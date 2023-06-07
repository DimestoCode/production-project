import { useMemo, useState, ReactNode } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";
import { ThemeContext } from "../../../../shared/lib/contexts/ThemeContext";
import { Theme } from "@/shared/const/theme";

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.Light;

interface IThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = ({ children, initialTheme }: IThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

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
