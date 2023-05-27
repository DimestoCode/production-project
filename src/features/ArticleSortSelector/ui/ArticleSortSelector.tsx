import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortField } from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { IListBoxItem, ListBox } from "@/shared/ui/Popups";
import { HStack } from "@/shared/ui/Stack";

interface IArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo(
    ({ className, onChangeOrder, onChangeSort, order, sort }: IArticleSortSelectorProps) => {
        const { t } = useTranslation("articles");
        const orderOptions = useMemo<IListBoxItem<SortOrder>[]>(
            () => [
                {
                    label: t("Ascending"),
                    value: "asc"
                },
                {
                    label: t("Descending"),
                    value: "desc"
                }
            ],
            [t]
        );

        const sortFieldOptions = useMemo<IListBoxItem<ArticleSortField>[]>(
            () => [
                {
                    label: t("Creation date"),
                    value: ArticleSortField.CreatedAt
                },
                {
                    label: t("Title"),
                    value: ArticleSortField.Title
                },
                {
                    label: t("Views"),
                    value: ArticleSortField.Views
                }
            ],
            [t]
        );

        return (
            <HStack align="center" className={className} gap="16">
                <ListBox label={t("Sort by")} onChange={onChangeSort} options={sortFieldOptions} value={sort} />
                <ListBox label={t("Order")} onChange={onChangeOrder} options={orderOptions} value={order} />
            </HStack>
        );
    }
);
