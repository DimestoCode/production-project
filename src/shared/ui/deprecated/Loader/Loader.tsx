import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Loader.module.scss";

interface ILoaderProps {
    className?: string;
}
/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Loader = memo(({ className = "" }: ILoaderProps) => (
    <div className={classNames(classes.Loader, {}, [className])}>
        <div className={classes.spinner} />
    </div>
));
