import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "8" | "16" | "24";
export type CardBorder = "round" | "normal";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    fullWidth?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

export const Card = ({
    className,
    children,
    variant = "normal",
    fullWidth,
    padding = "8",
    border = "normal",
    ...rest
}: ICardProps) => {
    return (
        <article
            className={classNames(classes.Card, { [classes.fullWidth]: fullWidth }, [
                className,
                classes[variant],
                classes[`padding-${padding}`],
                classes[`border-${border}`]
            ])}
            {...rest}
        >
            {children}
        </article>
    );
};
