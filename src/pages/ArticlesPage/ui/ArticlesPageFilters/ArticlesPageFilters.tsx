import { ArticleSortField, ArticleType, ArticleViewMode, ArticleViewSelector } from "entities/Article";
import { ArticleSortSelector } from "features/ArticleSortSelector";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { SortOrder } from "shared/types";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { useSearchParams } from "react-router-dom";
import { ITabItem } from "shared/ui/Tabs/Tabs";
import { ArticleTypeTabs } from "features/ArticleTypeTabs";
import { articlesActions } from "../../model/slices/articlesPageSlice";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import {
    getArticlesSearch,
    getArticlesSortField,
    getArticlesSortOrder,
    getArticlesType,
    getArticlesView
} from "../../model/selectors/articlesSelectors";
import classes from "./ArticlesPageFilters.module.scss";

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

    const fetchData = useCallback(() => {
        dispatch(articlesActions.setPage(1));
        dispatch(fetchArticlesList({ initialLoad: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleViewMode) => {
            dispatch(articlesActions.setView(view));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            setSearchParams({ order });
            dispatch(articlesActions.setOrder(order));
            fetchData();
        },
        [dispatch, fetchData, setSearchParams]
    );

    const onChangeSort = useCallback(
        (sortField: ArticleSortField) => {
            setSearchParams({ sort: sortField });
            dispatch(articlesActions.setSort(sortField));
            fetchData();
        },
        [dispatch, fetchData, setSearchParams]
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            setSearchParams({ search });
            dispatch(articlesActions.setSearch(search));
            debouncedFetchData();
        },
        [debouncedFetchData, dispatch, setSearchParams]
    );

    const onChangeType = useCallback(
        (tabItem: ITabItem) => {
            setSearchParams({ type: tabItem.value });
            dispatch(articlesActions.setType(tabItem.value as ArticleType));
            fetchData();
        },
        [dispatch, fetchData, setSearchParams]
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
