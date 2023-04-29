import { ArticleSortField } from "entities/Article";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { SortOrder } from "shared/types";
import { ISelectOption, Select } from "shared/ui/Select/Select";
import classes from "./ArticleSortSelector.module.scss";

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
        const orderOptions = useMemo<ISelectOption<SortOrder>[]>(
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

        const sortFieldOptions = useMemo<ISelectOption<ArticleSortField>[]>(
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
            <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
                <Select label={t("Sort by")} onChange={onChangeSort} options={sortFieldOptions} value={sort} />
                <Select label={t("Order")} onChange={onChangeOrder} options={orderOptions} value={order} />
            </div>
        );
    }
);
