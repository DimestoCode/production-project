import { lazy, memo, useCallback } from "react";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { ToggleFeatures } from "@/shared/lib/features";

const DeprecatedThemeIcon = lazy(() => import("@/shared/assets/icons/theme-light.svg"));
const RedesignedThemeIcon = lazy(() => import("@/shared/assets/icons/theme-redesigned.svg"));

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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <Button className={className} onClick={onToggleHandler} theme={ButtonTheme.Clear}>
                    <IconDeprecated Svg={DeprecatedThemeIcon} height={40} width={40} inverted />
                </Button>
            }
            on={<Icon Svg={RedesignedThemeIcon} onClick={onToggleHandler} clickable />}
        />
    );
});
