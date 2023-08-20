import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Overlay.module.scss";

interface IOverlayProps {
    className?: string;
    onClick: () => void;
}
/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Overlay = memo(({ className, onClick }: IOverlayProps) => {
    return <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />;
});
