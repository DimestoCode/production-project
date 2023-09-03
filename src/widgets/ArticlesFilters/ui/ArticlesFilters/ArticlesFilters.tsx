import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ArticlesFilters.module.scss";
import { Card } from "@/shared/ui/redesigned/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { SortOrder } from "@/shared/types/sort";
import { ITabItem } from "@/shared/ui/deprecated/Tabs";
import { Input } from "@/shared/ui/redesigned/Input";

interface IArticlesFiltersProps {
    className?: string;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSearch?: (value: string, name: string) => void;
    onChangeType: (tabItem: ITabItem) => void;
    search: string;
    sortOrder: SortOrder;
    sortField: ArticleSortField;
    type: ArticleType;
}

export const ArticlesFilters = memo<IArticlesFiltersProps>(
    ({
        className,
        onChangeOrder,
        onChangeSort,
        onChangeType,
        onChangeSearch,
        search,
        sortField,
        sortOrder,
        type
    }: IArticlesFiltersProps) => {
        const { t } = useTranslation("articles");

        return (
            <Card className={classNames(classes.ArticlesFilters, {}, [className])} padding="24">
                <VStack gap="32">
                    <Input onChange={onChangeSearch} placeholder={t("Search")} value={search} />
                    <ArticleSortSelector
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                        order={sortOrder}
                        sort={sortField}
                    />
                    <ArticleTypeTabs className={classes.tabs} onChangeType={onChangeType} value={type} />
                </VStack>
            </Card>
        );
    }
);
