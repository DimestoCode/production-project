import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Spinner } from "shared/ui/Spinner/Spinner";
import classes from "./Loader.module.scss";

interface ILoaderProps {
    className?: string;
}

export const Loader = memo(({ className = "" }: ILoaderProps) => (
    <div className={classNames(classes.Loader, {}, [className])}>
        <Spinner />
    </div>
));
