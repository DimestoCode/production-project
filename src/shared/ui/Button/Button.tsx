import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted"
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
}

export const Button: FC<IButtonProps> = (props) => {
    const { className = "", children, theme, square, size = ButtonSize.M, disabled, ...rest } = props;

    const dynamicClassnames: Record<string, boolean> = {
        [classes.square]: square,
        [classes.disabled]: disabled
    };
    const buttonClassnames = classNames(classes.Button, dynamicClassnames, [className, classes[theme], classes[size]]);

    return (
        <button type="button" {...rest} className={buttonClassnames} disabled={disabled}>
            {children}
        </button>
    );
};
