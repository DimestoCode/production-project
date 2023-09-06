import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IListBoxItem, IListBoxProps, ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { Country } from "../model/country";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

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

    const props: IListBoxProps<string> = {
        ...rest,
        "data-testid": "CountrySelect",
        defaultValue: t("Specify country"),
        disabled,
        label,
        name: "currency",
        onChange: onChangeHandler,
        options: countryOptions,
        value
    };

    return (
        <ToggleFeatures feature="isAppRedesigned" off={<ListBoxDeprecated {...props} />} on={<ListBox {...props} />} />
    );
};
