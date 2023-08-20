import { lazy, memo, useMemo, useState } from "react";
import noop from "lodash/noop";
import { NotificationList } from "@/entities/Notification";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon } from "@/shared/ui/deprecated/Icon";
import BellIcon from "@/shared/assets/icons/bell.svg";
import { useDevice } from "@/shared/lib/hooks/useDevice/useDevice";
import classes from "./NotificationButton.module.scss";

const Popover = lazy(() => import("@/shared/ui/deprecated/Popups").then((mod) => ({ default: mod.Popover })));
const Drawer = lazy(() => import("@/shared/ui/deprecated/Drawer/Drawer").then((mod) => ({ default: mod.Drawer })));

export const NotificationButton = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useDevice();

    const triggerButton = useMemo(() => {
        const handleOpenDrawer = () => setIsOpen(true);
        return (
            <Button onClick={isMobile ? handleOpenDrawer : noop} theme={ButtonTheme.Clear}>
                <Icon Svg={BellIcon} inverted />
            </Button>
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
        <Popover direction="bottom-left" triggerEl={triggerButton}>
            <NotificationList className={classes.notifications} />
        </Popover>
    );
});
