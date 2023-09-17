import { ReactNode } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../../redesigned/Overlay/Overlay";
import { Portal } from "../../redesigned/Portal/Portal";
import classes from "./Modal.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface IModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;

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

    const viewClass = toggleFeatures({
        name: "isAppRedesigned",
        on: () => classes.newModal,
        off: () => classes.oldModal
    });

    return (
        <Portal element={document.getElementById("app") ?? document.body}>
            <div className={classNames(classes.Modal, dynamicClasses, [viewClass, className])}>
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
