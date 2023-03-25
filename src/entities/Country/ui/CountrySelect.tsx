import { ISelectOption, Select } from "shared/ui/Select/Select";
import { SelectHTMLAttributes, useCallback } from "react";
import { Country } from "../model/country";

interface CountrySelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
    label?: string;
    value?: Country;
    onChange?: (currency: Country, name: string) => void;
}

const countryOptions: ISelectOption<Country>[] = Object.entries(Country).map(([, value]) => ({
    title: value,
    value
}));

export const CountrySelect = ({ label, value, onChange, disabled, ...rest }: CountrySelectProps) => {
    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country, "country");
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
            options={countryOptions}
            value={value}
        />
    );
};
