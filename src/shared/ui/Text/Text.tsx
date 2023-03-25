import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Text.module.scss";

export enum TextTheme {
    PRIMARY = "primary",
    ERROR = "error"
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: "left" | "center" | "right";
}

export const Text = memo(({ className, title, text, theme = TextTheme.PRIMARY, align = "left" }: TextProps) => (
    <div className={classNames(classes.Text, {}, [className, classes[theme], classes[align]])}>
        {title && <p className={classes.title}>{title}</p>}
        {text && <p className={classes.text}>{text}</p>}
    </div>
));
