import { ElementType, HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Flex.module.scss";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexWrap = "nowrap" | "wrap";
export type FlexGap = "4" | "8" | "16" | "24" | "32";

export interface IFlexProps extends HTMLAttributes<HTMLOrSVGElement> {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    wrap?: FlexWrap;
    maxWidth?: boolean;
    tag?: ElementType;
}

const justifyClasses: Record<FlexJustify, string> = {
    start: classes.justifyStart,
    center: classes.justifyCenter,
    between: classes.justifyBetween,
    end: classes.justifyEnd
};

const alignClasses: Record<FlexAlign, string> = {
    start: classes.alignStart,
    center: classes.alignCenter,
    end: classes.alignEnd
};

const directionClasses: Record<FlexDirection, string> = {
    column: classes.directionColumn,
    row: classes.directionRow
};

const gapClasses: Record<FlexGap, string> = {
    "4": classes.gap4,
    "8": classes.gap8,
    "16": classes.gap16,
    "24": classes.gap24,
    "32": classes.gap32
};

export const Flex = ({
    className,
    children,
    align = "center",
    direction = "row",
    justify = "start",
    wrap = "nowrap",
    gap,
    tag = "div",
    maxWidth,
    ...rest
}: IFlexProps) => {
    const additionalClasses = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        classes[wrap],
        gap && gapClasses[gap]
    ];

    const Tag = tag;

    return (
        <Tag className={classNames(classes.Flex, { [classes.maxWidth]: maxWidth }, additionalClasses)} {...rest}>
            {children}
        </Tag>
    );
};
