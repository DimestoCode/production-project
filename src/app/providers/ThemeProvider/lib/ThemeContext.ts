import { createContext, Dispatch, SetStateAction } from "react";

export enum Theme {
    Light = "app-light-theme",
    Dark = "app-dark-theme"
}

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
