import { lazy, memo } from "react";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";

const DarkIcon = lazy(() => import("@/shared/assets/icons/theme-dark.svg"));
const LightIcon = lazy(() => import("@/shared/assets/icons/theme-light.svg"));
const OrangeIcon = lazy(() => import("@/shared/assets/icons/theme-orange.svg"));

interface IThemeSwitcherProps {
    className?: string;
}

const icons: Record<Theme, JSX.Element> = {
    [Theme.Dark]: <LightIcon />,
    [Theme.Light]: <OrangeIcon />,
    [Theme.Orange]: <DarkIcon />
};

export const ThemeSwitcher = memo(({ className = "" }: IThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button className={className} onClick={toggleTheme} theme={ButtonTheme.Clear}>
            {icons[theme]}
        </Button>
    );
});
