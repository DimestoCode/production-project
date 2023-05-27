import { ReactNode, useCallback, useEffect } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import { useAnimationLibraries } from "@/shared/lib/components/AnimationProvider";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import classes from "./Drawer.module.scss";
import withAnimationProvider from "@/shared/lib/components/AnimationProvider/withAnimationProvider";

interface IDrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const height = window.innerHeight - 100;

export const DrawerContent = ({ children, onClose, className, isOpen }: IDrawerProps) => {
    const { Spring, Gesture } = useAnimationLibraries();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const { handleClose, isClosing } = useModal({
        isOpen,
        onClose,
        animationDelay: 300
    });
    const { theme } = useTheme();

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [isOpen, openDrawer]);

    const closeDrawer = useCallback(
        (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                config: { ...Spring.config.stiff, velocity },
                onResolve: handleClose
            });
        },
        [Spring.config.stiff, api, handleClose]
    );

    const mods: ClassNameObject = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing
    };

    const bind = Gesture.useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
            if (my < -70) cancel();
            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true
        }
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? "block" : "none"));
    return (
        <Portal>
            <div className={classNames(classes.Drawer, mods, [className, theme, "app_drawer"])}>
                <Overlay onClick={() => closeDrawer()} />
                <Spring.a.div
                    className={classes.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
};

const DrawerWrapper = (props: IDrawerProps) => {
    const { isLoaded } = useAnimationLibraries();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

export const Drawer = withAnimationProvider(DrawerWrapper);
