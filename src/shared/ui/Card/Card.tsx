import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = ({ className, children, ...rest }: ICardProps) => {
    return (
        <article className={classNames(classes.Card, {}, [className])} {...rest}>
            {children}
        </article>
    );
};
