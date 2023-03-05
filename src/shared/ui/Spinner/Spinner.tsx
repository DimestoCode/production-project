import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Spinner.module.scss";

interface ISpinnerProps {
    className?: string;
}

export const Spinner = ({ className = "" }: ISpinnerProps) => (
    <div className={classNames(classes.Spinner, {}, [className])} />
);
