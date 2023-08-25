import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

export enum CardTheme {
    Normal = "normal",
    Outlined = "outlined"
}
interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    fullWidth?: boolean;
}
/**
 * Redesigned components are supposed to be used
 * @deprecated
 */
export const Card = ({ className, children, theme = CardTheme.Normal, fullWidth, ...rest }: ICardProps) => {
    return (
        <article
            className={classNames(classes.Card, { [classes.fullWidth]: fullWidth }, [className, classes[theme]])}
            {...rest}
        >
            {children}
        </article>
    );
};
