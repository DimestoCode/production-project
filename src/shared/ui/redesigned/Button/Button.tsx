import { ButtonHTMLAttributes, ReactNode, forwardRef, memo } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export type ButtonVariant = "clear" | "outlined" | "filled";
export type ButtonSize = "m" | "l" | "xl";
export type ButtonColor = "normal" | "success" | "error";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    fullWidth?: boolean;
    addonRight?: ReactNode;
    addonLeft?: ReactNode;
    color?: ButtonColor;
}

export const ButtonWithRef = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const {
        className = "",
        children,
        variant = "outlined",
        square,
        size = "size_m",
        disabled,
        fullWidth,
        addonRight,
        addonLeft,
        color = "normal",
        ...rest
    } = props;

    const classNamesObject: ClassNameObject = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth
    };
    const buttonClassnames = classNames(classes.Button, classNamesObject, [
        className,
        classes[variant],
        classes[size],
        classes[color]
    ]);

    return (
        <button type="button" {...rest} className={buttonClassnames} disabled={disabled} ref={ref}>
            {addonLeft}
            {children as ReactNode}
            {addonRight}
        </button>
    );
});

export const Button = memo(ButtonWithRef);
