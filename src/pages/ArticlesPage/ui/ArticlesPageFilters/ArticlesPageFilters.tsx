import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ArticleSortField, ArticleType, ArticleViewMode } from "@/entities/Article";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { SortOrder } from "@/shared/types/sort";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { ITabItem } from "@/shared/ui/Tabs";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { useArticlesActions } from "../../model/slices/articlesPageSlice";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import {
    getArticlesSearch,
    getArticlesSortField,
    getArticlesSortOrder,
    getArticlesType,
    getArticlesView
} from "../../model/selectors/articlesSelectors";
import classes from "./ArticlesPageFilters.module.scss";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";

interface IArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(({ className }: IArticlesPageFiltersProps) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation("articles");
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesView);
    const sortOrder = useSelector(getArticlesSortOrder);
    const sortField = useSelector(getArticlesSortField);
    const search = useSelector(getArticlesSearch);
    const type = useSelector(getArticlesType);

    const { setArticles, setOrder, setPage, setSearch, setSort, setType, setView } = useArticlesActions();

    const fetchData = useCallback(() => {
        setPage(1);
        dispatch(fetchArticlesList({ initialLoad: true }));
    }, [dispatch, setPage]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleViewMode) => {
            setView(view);
            fetchData();
        },
        [setView, fetchData]
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            setArticles({ articles: [], initialLoad: true });
            setSearchParams({ order });
            setOrder(order);
            fetchData();
        },
        [setOrder, fetchData, setSearchParams, setArticles]
    );

    const onChangeSort = useCallback(
        (sortField: ArticleSortField) => {
            setArticles({ articles: [], initialLoad: true });
            setSearchParams({ sort: sortField });

            setSort(sortField);
            fetchData();
        },
        [fetchData, setArticles, setSearchParams, setSort]
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            setArticles({ articles: [], initialLoad: true });
            setSearchParams({ search });
            setSearch(search);
            debouncedFetchData();
        },
        [debouncedFetchData, setArticles, setSearch, setSearchParams]
    );

    const onChangeType = useCallback(
        (tabItem: ITabItem) => {
            setArticles({ articles: [], initialLoad: true });
            setSearchParams({ type: tabItem.value });
            setType(tabItem.value as ArticleType);
            fetchData();
        },
        [fetchData, setArticles, setSearchParams, setType]
    );

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
