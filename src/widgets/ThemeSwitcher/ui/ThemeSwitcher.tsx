import { memo } from "react";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme-light.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

interface IThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className = "" }: IThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button className={classNames("", {}, [className])} onClick={toggleTheme} theme={ButtonTheme.Clear}>
            {theme === Theme.Dark ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
