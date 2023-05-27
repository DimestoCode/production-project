import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Text.module.scss";

export enum TextTheme {
    Primary = "primary",
    Inverted = "inverted",
    Error = "error"
}

type TextSize = "S" | "M" | "L";

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: "left" | "center" | "right";
    size?: TextSize;
    "data-testid"?: string;
}

const mapHeaderSizeToTag: Record<TextSize, keyof JSX.IntrinsicElements> = {
    S: "h3",
    L: "h2",
    M: "h1"
};

export const Text = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.Primary,
        align = "left",
        size = "M",
        "data-testid": dataTestId
    }: TextProps) => {
        const HeaderTag = mapHeaderSizeToTag[size];

        const additionalClasses: (string | undefined)[] = [className, classes[theme], classes[align], classes[size]];
        return (
            <div className={classNames(classes.Text, {}, additionalClasses)}>
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
