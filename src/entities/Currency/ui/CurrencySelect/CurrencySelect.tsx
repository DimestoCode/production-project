import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IListBoxProps, IListBoxItem, ListBox } from "@/shared/ui/deprecated/Popups";
import { Currency } from "../../model/consts/consts";

interface CurrencySelectProps extends Omit<IListBoxProps<Currency>, "onChange" | "options"> {
    onChange?: (currency: Currency, name: string) => void;
}

const currencyOptions: IListBoxItem<Currency>[] = Object.entries(Currency).map(([, value]) => ({
    label: value,
    value
}));

export const CurrencySelect = ({ label, value, onChange, disabled, ...rest }: CurrencySelectProps) => {
    const { t } = useTranslation("common");

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency, "currency");
        },
        [onChange]
    );
    return (
        <ListBox
            {...rest}
            data-testid="CurrencySelect"
            defaultValue={t("Specify currency")}
            disabled={disabled}
            label={label}
            name="currency"
            onChange={onChangeHandler}
            options={currencyOptions}
            value={value}
        />
    );
};
