import { ReactNode } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import classes from "./Modal.module.scss";

interface IModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;
/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Modal = ({ className = "", children, isOpen, onClose, lazy }: IModalProps) => {
    const { handleClose, isClosing, isMounted } = useModal({
        isOpen,
        onClose,
        animationDelay: ANIMATION_DELAY
    });

    const dynamicClasses: ClassNameObject = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(classes.Modal, dynamicClasses, [className])}>
                <Overlay onClick={handleClose} />
                <div
                    className={classNames(classes.content, {
                        [classes.contentOpened]: isOpen
                    })}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
