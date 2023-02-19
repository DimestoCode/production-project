import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames";
import classes from "./Button.module.scss";

export enum ThemeButton {
    CLEAR = "clear"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className, children, theme = ThemeButton.CLEAR, ...rest
    } = props;
    return (
        <button type="button" {...rest} className={classNames(classes.button, {}, [className, classes[theme]])}>
            {children}
        </button>
    );
};
