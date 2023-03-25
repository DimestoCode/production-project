import { ISelectOption, Select } from "shared/ui/Select/Select";
import { SelectHTMLAttributes, useCallback } from "react";
import { Currency } from "../../model/types/currency";

interface CurrencySelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
    label?: string;
    value?: Currency;
    onChange?: (currency: Currency, name: string) => void;
}

const currencyOptions: ISelectOption<Currency>[] = Object.entries(Currency).map(([, value]) => ({
    title: value,
    value
}));

export const CurrencySelect = ({ label, value, onChange, disabled, ...rest }: CurrencySelectProps) => {
    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency, "currency");
        },
        [onChange]
    );
    return (
        <Select
            {...rest}
            disabled={disabled}
            label={label}
            name="currency"
            onChange={onChangeHandler}
            options={currencyOptions}
            value={value}
        />
    );
};
