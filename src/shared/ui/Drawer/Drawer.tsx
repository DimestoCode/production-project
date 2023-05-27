import { useTheme } from "app/providers/ThemeProvider";
import { memo, ReactNode } from "react";
import { ClassNameObject, classNames } from "shared/lib/classNames/classNames";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import classes from "./Drawer.module.scss";

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
}

export const Drawer = memo(({ children, onClose, className, isOpen, lazy }: DrawerProps) => {
    const { handleClose, isClosing, isMounted } = useModal({
        isOpen,
        onClose,
        animationDelay: 300
    });
    const { theme } = useTheme();

    const mods: ClassNameObject = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(classes.Drawer, mods, [className, theme, "app_drawer"])}>
                <Overlay onClick={handleClose} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    );
});
