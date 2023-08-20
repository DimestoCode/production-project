import { memo, useCallback } from "react";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Icon } from "@/shared/ui/Icon";

import LightIcon from "@/shared/assets/icons/theme-light.svg";

interface IThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className = "" }: IThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
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
            <Icon Svg={LightIcon} height={40} width={40} inverted />
        </Button>
    );
});
