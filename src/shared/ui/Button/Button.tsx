import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export enum ButtonTheme {
    Clear = "clear",
    ClearInverted = "clearInverted",
    Outline = "outline",
    OutlineRed = "outlineRed",
    Background = "background",
    BackgroundInverted = "backgroundInverted"
}

export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl"
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    fullWidth?: boolean;
}

export const ButtonWithRef = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const {
        className = "",
        children,
        theme = ButtonTheme.Outline,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        ...rest
    } = props;

    const classNamesObject: ClassNameObject = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth
    };
    const buttonClassnames = classNames(classes.Button, classNamesObject, [className, classes[theme], classes[size]]);

    return (
        <button type="button" {...rest} className={buttonClassnames} disabled={disabled} ref={ref}>
            {children}
        </button>
    );
});

export const Button = memo(ButtonWithRef);
