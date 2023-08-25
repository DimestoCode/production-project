import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "8" | "16" | "24";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    fullWidth?: boolean;
    padding?: CardPadding;
}

export const Card = ({ className, children, variant = "normal", fullWidth, padding = "8", ...rest }: ICardProps) => {
    return (
        <article
            className={classNames(classes.Card, { [classes.fullWidth]: fullWidth }, [
                className,
                classes[variant],
                classes[`padding-${padding}`]
            ])}
            {...rest}
        >
            {children}
        </article>
    );
};
