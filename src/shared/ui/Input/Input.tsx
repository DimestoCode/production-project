import { ChangeEvent, InputHTMLAttributes, memo, SyntheticEvent, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Input.module.scss";

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo(({ className, value, onChange, type = "text", placeholder, ...rest }: IInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>();
    const [caretPosition, setCaretPosition] = useState(0);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
        setCaretPosition(e.currentTarget.selectionEnd);
    };

    return (
        <div className={classNames(classes.InputWrapper, {}, [className])}>
            {placeholder && <div className={classes.placeholder}>{`${placeholder}>`}</div>}
            <div className={classes.caretWrapper}>
                <input
                    className={classes.input}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    ref={inputRef}
                    type={type}
                    value={value}
                    {...rest}
                />
                {isFocused && (
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
});
