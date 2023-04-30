import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Text.module.scss";

export enum TextTheme {
    Primary = "primary",
    Inverted = "inverted",
    Error = "error"
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: "left" | "center" | "right";
    size?: "M" | "L";
}

export const Text = memo(
    ({ className, title, text, theme = TextTheme.Primary, align = "left", size = "M" }: TextProps) => {
        const additionalClasses: (string | undefined)[] = [className, classes[theme], classes[align], classes[size]];
        return (
            <div className={classNames(classes.Text, {}, additionalClasses)}>
                {title && <p className={classes.title}>{title}</p>}
                {text && <p className={classes.text}>{text}</p>}
            </div>
        );
    }
);
