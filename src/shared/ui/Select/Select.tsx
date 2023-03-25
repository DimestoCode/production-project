import { ChangeEvent, memo, SelectHTMLAttributes, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Select.module.scss";

export interface ISelectOption<T extends string> {
    value: T;
    title: string;
}

interface ISelectProps<T extends string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
    className?: string;
    label?: string;
    options: ISelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
}

const SelectComp = <T extends string>({
    className,
    label,
    options,
    onChange,
    value,
    disabled,
    ...rest
}: ISelectProps<T>) => {
    const optionList = useMemo(
        () =>
            options?.map(({ value, title }) => (
                <option className={classes.option} key={value} value={value}>
                    {title}
                </option>
            )),
        [options]
    );

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    return (
        <div className={classNames(classes.SelectWrapper, { [classes.disabled]: disabled }, [className])}>
            {label && <span className={classes.label}>{`${label}>`}</span>}
            <select {...rest} className={classes.select} disabled={disabled} onChange={onChangeHandler} value={value}>
                {optionList}
            </select>
        </div>
    );
};

export const Select = memo(SelectComp);
