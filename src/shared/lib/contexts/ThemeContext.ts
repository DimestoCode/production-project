import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "@/shared/const/theme";

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeContextProps>({});
