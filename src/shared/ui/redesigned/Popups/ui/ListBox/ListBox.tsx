import { Fragment, ReactNode, SelectHTMLAttributes, useMemo } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";
import { DropdownDirection } from "@/shared/types/ui";
import classes from "./ListBox.module.scss";
import popup from "../../styles/popup.module.scss";
import { Button } from "../../../Button/Button";
import { Icon } from "../../../Icon/Icon";
import CheckIcon from "@/shared/assets/icons/check-icon.svg";

export interface IListBoxItem<T> {
    value: T;
    label: ReactNode;
    disabled?: boolean;
}

export interface IListBoxProps<T extends string>
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "defaultValue"> {
    className?: string;
    label?: string;
    options: IListBoxItem<T>[];
    value?: T;
    defaultValue?: T;
    disabled?: boolean;
    onChange: (value: T) => void;
    name?: string;
    direction?: DropdownDirection;
}

export const ListBox = <T extends string>({
    options,
    className,
    disabled,
    label,
    onChange,
    defaultValue,
    value,
    name,
    direction = "bottom-left"
}: IListBoxProps<T>) => {
    const currentOption = useMemo(() => options.find((item) => item.value === value), [options, value]);

    return (
        <div>
            <HListbox
                as="div"
                className={classNames(
                    popup.popup,
                    {
                        [classes.disabled]: disabled
                    },
                    [classes.ListBox, className]
                )}
                disabled={disabled}
                name={name}
                onChange={onChange}
                value={value}
            >
                {({ open }) => (
                    <>
                        {!!label && (
                            <HListbox.Label className={classNames(classes.label, { [classes.disabled]: disabled })}>
                                {label}
                            </HListbox.Label>
                        )}

                        <div style={{ position: "relative" }}>
                            <HListbox.Button
                                addonRight={<Icon Svg={ArrowDownIcon} />}
                                as={Button}
                                className={classNames(classes.triggerBtn, { [classes.isOpen]: open })}
                                disabled={disabled}
                                variant="filled"
                            >
                                <span>{currentOption?.label ?? defaultValue}</span>
                            </HListbox.Button>

                            <HListbox.Options
                                className={classNames(classes.options, { [classes.isOpen]: open }, [
                                    classes[direction],
                                    popup.options
                                ])}
                                static
                            >
                                {options.map((item) => (
                                    <HListbox.Option
                                        as={Fragment}
                                        disabled={item.disabled}
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {({ active, selected }) => (
                                            <li
                                                className={classNames(classes.item, {
                                                    [popup.active]: active || selected,
                                                    [classes.disabled]: item.disabled
                                                })}
                                            >
                                                {item.label}
                                                {selected && <Icon Svg={CheckIcon} color="inherit" />}
                                            </li>
                                        )}
                                    </HListbox.Option>
                                ))}
                            </HListbox.Options>
                        </div>
                    </>
                )}
            </HListbox>
        </div>
    );
};
