import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortField } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { IListBoxItem, ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { Text } from "@/shared/ui/redesigned/Text";

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

        const sortFieldOptions = useMemo<IListBoxItem<ArticleSortField>[]>(() => {
            console.log("h");
            return [
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
            ];
        }, [t]);

        console.log(sortFieldOptions);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <HStack align="center" className={className} gap="16">
                        <ListBoxDeprecated<ArticleSortField>
                            label={t("Sort by")}
                            onChange={onChangeSort}
                            options={sortFieldOptions}
                            value={sort}
                        />
                        <ListBoxDeprecated<SortOrder>
                            label={t("Order")}
                            onChange={onChangeOrder}
                            options={orderOptions}
                            value={order}
                        />
                    </HStack>
                }
                on={
                    <VStack gap="8">
                        <Text text={`${t("Sort by")}:`} />
                        <VStack className={className} gap="16">
                            <ListBox<ArticleSortField>
                                onChange={onChangeSort}
                                options={sortFieldOptions}
                                value={sort}
                            />

                            <ListBox<SortOrder> onChange={onChangeOrder} options={orderOptions} value={order} />
                        </VStack>
                    </VStack>
                }
            />
        );
    }
);
