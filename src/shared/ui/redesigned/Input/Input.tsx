import { ChangeEvent, InputHTMLAttributes, memo, ReactNode, useRef, useState } from "react";
import { ClassNameObject, classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Input.module.scss";
import { HStack } from "../Stack";
import { Text } from "../Text";

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    className?: string;
    value?: string | number;
    onChange?: (value: string, name: string) => void;
    regExp?: RegExp;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    label?: string;
}

export const Input = memo(
    ({
        className,
        value,
        onChange,
        type = "text",
        placeholder,
        disabled,
        regExp,
        addonLeft,
        addonRight,
        label,
        ...rest
    }: IInputProps) => {
        const [isFocused, setIsFocused] = useState(false);

        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value && regExp && !regExp.test(e.target.value)) {
                return;
            }

            onChange?.(e.target.value, e.target.name);
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

        const mods: ClassNameObject = {
            [classes.disabled]: disabled,
            [classes.focused]: isFocused
        };

        const input = (
            <div className={classNames(classes.InputWrapper, mods, [className])}>
                {!!addonLeft && <span className={classes.addonLeft}>{addonLeft}</span>}
                <input
                    {...rest}
                    className={classes.input}
                    disabled={disabled}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    ref={inputRef}
                    type={type}
                    value={value}
                />
                {!!addonRight && <span className={classes.addonRight}>{addonRight}</span>}
            </div>
        );

        if (label) {
            return (
                <HStack gap="8" maxWidth>
                    <Text text={label} />
                    {input}
                </HStack>
            );
        }

        return input;
    }
);
