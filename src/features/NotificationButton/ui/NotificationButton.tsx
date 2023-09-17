import { lazy, memo, useMemo, useState } from "react";
import noop from "lodash/noop";
import { NotificationList } from "@/entities/Notification";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";

import { useDevice } from "@/shared/lib/hooks/useDevice/useDevice";
import classes from "./NotificationButton.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

const NotificationIconDeprecated = lazy(() => import("@/shared/assets/icons/bell.svg"));
const NotificationIcon = lazy(() => import("@/shared/assets/icons/bell-redesigned.svg"));

const PopoverDeprecated = lazy(() => import("@/shared/ui/deprecated/Popups").then((mod) => ({ default: mod.Popover })));
const Drawer = lazy(() => import("@/shared/ui/redesigned/Drawer/Drawer").then((mod) => ({ default: mod.Drawer })));

export const NotificationButton = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useDevice();

    const triggerButton = useMemo(() => {
        const handleOpenDrawer = () => setIsOpen(true);

        const correctedHandler = isMobile ? handleOpenDrawer : noop;
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <ButtonDeprecated onClick={correctedHandler} theme={ButtonTheme.Clear}>
                        <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                    </ButtonDeprecated>
                }
                on={<Icon Svg={NotificationIcon} onClick={correctedHandler} clickable />}
            />
        );
    }, [isMobile]);

    return isMobile ? (
        <>
            {triggerButton}
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <NotificationList />
            </Drawer>
        </>
    ) : (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <PopoverDeprecated direction="bottom-left" triggerEl={triggerButton}>
                    <NotificationList className={classes.notifications} />
                </PopoverDeprecated>
            }
            on={
                <Popover direction="bottom-left" triggerEl={triggerButton}>
                    <NotificationList className={classes.notifications} />
                </Popover>
            }
        />
    );
});
