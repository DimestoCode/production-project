import { useCallback } from "react";
import { IListBoxItem, IListBoxProps, ListBox } from "shared/ui/ListBox/ListBox";
import { useTranslation } from "react-i18next";
import { Country } from "../model/country";

interface CountrySelectProps extends Omit<IListBoxProps<Country>, "onChange" | "options"> {
    onChange?: (currency: Country, name: string) => void;
}

const countryOptions: IListBoxItem<Country>[] = Object.entries(Country).map(([, value]) => ({
    label: value,
    value
}));

export const CountrySelect = ({ label, value, onChange, disabled, ...rest }: CountrySelectProps) => {
    const { t } = useTranslation("common");
    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country, "country");
        },
        [onChange]
    );

    return (
        <ListBox
            {...rest}
            data-testid="CountrySelect"
            defaultValue={t("Specify country")}
            disabled={disabled}
            label={label}
            name="currency"
            onChange={onChangeHandler}
            options={countryOptions}
            value={value}
        />
    );
};
