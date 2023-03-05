import { createContext, Dispatch, SetStateAction } from "react";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
