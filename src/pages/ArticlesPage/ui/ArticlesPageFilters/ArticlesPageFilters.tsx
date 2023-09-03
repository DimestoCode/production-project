import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/deprecated/Card";
import { Input } from "@/shared/ui/deprecated/Input";

import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";

import classes from "./ArticlesPageFilters.module.scss";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface IArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(({ className }: IArticlesPageFiltersProps) => {
    const { t } = useTranslation("articles");
    const {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        onChangeView,
        search,
        sortField,
        sortOrder,
        type,
        view
    } = useArticleFilters();

    return (
        <div className={classNames(classes.ArticlesPageFilters, {}, [className])}>
            <div className={classes.sortWrapper}>
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                    order={sortOrder}
                    sort={sortField}
                />
                <ArticleViewSelector onViewClick={onChangeView} view={view} />
            </div>
            <Card className={classes.search}>
                <Input onChange={onChangeSearch} placeholder={t("Search")} value={search} />
            </Card>
            <ArticleTypeTabs className={classes.tabs} onChangeType={onChangeType} value={type} />
        </div>
    );
});
