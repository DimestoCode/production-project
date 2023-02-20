import { classNames } from "shared/lib/classNames";
import { Spinner } from "shared/ui/Spinner/Spinner";
import classes from "./Loader.module.scss";

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(classes.Loader, {}, [className])}>
        <Spinner />
    </div>
);
