import { lazy, memo, useCallback, JSX } from "react";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";

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
    const dispatch = useAppDispatch();

    const dispatchSaveJsonSettings = useCallback(
        (theme: Theme) => {
            dispatch(saveJsonSettings({ theme }));
        },
        [dispatch]
    );
    const debouncedSaveJsonSettings = useDebounce(dispatchSaveJsonSettings, 500);

    const onToggleHandler = useCallback(() => {
        toggleTheme((theme) => {
            debouncedSaveJsonSettings(theme);
        });
    }, [debouncedSaveJsonSettings, toggleTheme]);

    return (
        <Button className={className} onClick={onToggleHandler} theme={ButtonTheme.Clear}>
            {icons[theme]}
        </Button>
    );
});
