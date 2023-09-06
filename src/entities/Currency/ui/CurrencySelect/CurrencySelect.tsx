import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IListBoxProps, IListBoxItem, ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { Currency } from "../../model/consts/consts";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

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

    const props: IListBoxProps<string> = {
        ...rest,
        "data-testid": "CurrencySelect",
        defaultValue: t("Specify currency"),
        disabled,
        label,
        name: "currency",
        onChange: onChangeHandler,
        options: currencyOptions,
        value
    };

    return (
        <ToggleFeatures feature="isAppRedesigned" off={<ListBoxDeprecated {...props} />} on={<ListBox {...props} />} />
    );
};
