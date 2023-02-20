import { classNames } from "shared/lib/classNames";
import classes from "./Spinner.module.scss";

interface SpinnerProps {
    className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => (
    <div className={classNames(classes.Spinner, {}, [className])} />
);
