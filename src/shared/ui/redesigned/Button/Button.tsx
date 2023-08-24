import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export type ButtonVariant = "clear" | "outlined";

export type ButtonSize = "m" | "l" | "xl";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    fullWidth?: boolean;
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
        ...rest
    } = props;

    const classNamesObject: ClassNameObject = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth
    };
    const buttonClassnames = classNames(classes.Button, classNamesObject, [className, classes[variant], classes[size]]);

    return (
        <button type="button" {...rest} className={buttonClassnames} disabled={disabled} ref={ref}>
            {children}
        </button>
    );
});

export const Button = memo(ButtonWithRef);
