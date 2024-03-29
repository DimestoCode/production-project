import { memo, JSX } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";
export type TextAlign = "left" | "center" | "right";
export type TextSize = "S" | "M" | "L";

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    "data-testid"?: string;
}

const mapHeaderSizeToTag: Record<TextSize, keyof JSX.IntrinsicElements> = {
    S: "h3",
    L: "h1",
    M: "h2"
};

export const Text = memo(
    ({
        className,
        title,
        text,
        variant = "primary",
        align = "left",
        size = "M",
        "data-testid": dataTestId,
        bold
    }: TextProps) => {
        const HeaderTag = mapHeaderSizeToTag[size];
        const additionalClasses: (string | undefined)[] = [className, classes[variant], classes[align], classes[size]];

        return (
            <div className={classNames(classes.Text, { [classes.bold]: bold }, additionalClasses)}>
                {title && (
                    <HeaderTag className={classes.title} data-testid={`${dataTestId}.Header`}>
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p className={classes.text} data-testid={`${dataTestId}.Text`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }
);
