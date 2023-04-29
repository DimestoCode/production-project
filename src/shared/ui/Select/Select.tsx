import { memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import ReactSelect, { SingleValue } from "react-select";
import classes from "./Select.module.scss";

export interface ISelectOption<T> {
    value: T;
    label: string;
}

interface ISelectProps<T> {
    className?: string;
    label?: string;
    options: ISelectOption<T>[];
    value?: T;
    disabled?: boolean;
    onChange?: (value: T) => void;
}

const SelectComp = <T extends string>({ className, label, options, onChange, value, disabled }: ISelectProps<T>) => {
    const onChangeHandler = (newValue: SingleValue<ISelectOption<T>>) => {
        if (newValue) {
            onChange?.(newValue.value);
        }
    };

    const currentValue: ISelectOption<T> | null = useMemo(
        () => options.find((option) => option.value === value) || null,
        [options, value]
    );

    return (
        <div className={classNames(classes.SelectWrapper, { [classes.disabled]: disabled }, [className])}>
            {label && <span className={classes.label}>{`${label}>`}</span>}
            <ReactSelect
                isDisabled={disabled}
                isSearchable={false}
                onChange={onChangeHandler}
                options={options}
                placeholder=""
                styles={{
                    menu: (provided) => ({
                        ...provided,
                        background: "transparent",
                        borderRadius: "5px"
                    }),
                    menuList: (provided) => ({
                        ...provided,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderRadius: "5px"
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        color: state.isSelected ? "var(--primary-color)" : "var(--inverted-primary-color)",
                        background: state.isSelected ? "var(--bg-color)" : "var(--inverted-bg-color)",
                        "&:hover": {
                            background: "var(--bg-color)",
                            color: "var(--primary-color)"
                        },
                        "&:first-child": {
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px"
                        },
                        "&:last-child": {
                            borderBottomLeftRadius: "5px",
                            borderBottomRightRadius: "5px"
                        }
                    }),
                    control: (provided) => ({
                        ...provided,
                        background: "var(--inverted-primary-color",
                        outline: "none",
                        padding: "2px 10px  2px 2px"
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "var(--primary-color)"
                    })
                }}
                value={currentValue}
            />
        </div>
    );
};

export const Select = memo(SelectComp) as typeof SelectComp;
