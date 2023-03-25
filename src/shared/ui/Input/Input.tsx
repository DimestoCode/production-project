import { ChangeEvent, InputHTMLAttributes, memo, SyntheticEvent, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Input.module.scss";

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    className?: string;
    value?: string | number;
    onChange?: (value: string, name: string) => void;
    regExp?: RegExp;
}

export const Input = memo(
    ({ className, value, onChange, type = "text", placeholder, disabled, regExp, ...rest }: IInputProps) => {
        const [isFocused, setIsFocused] = useState(false);
        const [caretPosition, setCaretPosition] = useState(0);

        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value && regExp && !regExp.test(e.target.value)) {
                return;
            }

            onChange?.(e.target.value, e.target.name);
            setCaretPosition(e.target.value.length);
        };

        const onBlur = () => {
            if (!disabled) {
                setIsFocused(false);
            }
        };

        const onFocus = () => {
            if (!disabled) {
                setIsFocused(true);
            }
        };

        const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
            if (e.currentTarget.selectionEnd !== null) {
                setCaretPosition(e.currentTarget.selectionEnd);
            }
        };

        const isCaretVisible = isFocused && !disabled;

        return (
            <div className={classNames(classes.InputWrapper, { [classes.disabled]: disabled }, [className])}>
                {placeholder && <div className={classes.placeholder}>{`${placeholder}>`}</div>}
                <div className={classes.caretWrapper}>
                    <input
                        className={classes.input}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={handleChange}
                        onFocus={onFocus}
                        onSelect={onSelect}
                        ref={inputRef}
                        type={type}
                        value={value}
                        {...rest}
                    />
                    {isCaretVisible && (
                        <span
                            className={classes.caret}
                            style={{
                                left: `${caretPosition * 9}px`
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
);
