import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, MouseEvent, useState, useRef, useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import classes from "./Modal.module.scss";

interface IModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}
const ANIMATION_DELAY = 300;

export const Modal = ({ className, children, isOpen, onClose }: IModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const { theme } = useTheme();
    const handleClose = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        },
        [handleClose]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const dynamicClasses: Record<string, boolean> = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing
    };

    const handleContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };
    return (
        <Portal>
            <div className={classNames(classes.Modal, dynamicClasses, [className, classes[theme]])}>
                <div className={classes.overlay} onClick={handleClose}>
                    <div
                        className={classNames(classes.content, {
                            [classes.contentOpened]: isOpen
                        })}
                        onClick={handleContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
