import { ReactNode, useEffect, useMemo, useState } from "react";
import { useJsonSettings } from "@/entities/User";
import { Theme } from "@/shared/const/theme";
import { ThemeContext } from "../../../../shared/lib/contexts/ThemeContext";

interface IThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = ({ children, initialTheme }: IThemeProviderProps) => {
    const [isThemeInitialized, setIsThemeInitialized] = useState(false);
    const { theme: defaultTheme = Theme.Light } = useJsonSettings();

    const [theme, setTheme] = useState<Theme>(() => initialTheme || defaultTheme);

    useEffect(() => {
        if (!isThemeInitialized) {
            setIsThemeInitialized(true);
            setTheme(defaultTheme);
        }
    }, [defaultTheme, isThemeInitialized]);

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
