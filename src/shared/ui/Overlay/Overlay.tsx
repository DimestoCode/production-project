import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Overlay.module.scss";

interface IOverlayProps {
    className?: string;
    onClick: () => void;
}

export const Overlay = memo(({ className, onClick }: IOverlayProps) => {
    return <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />;
});
