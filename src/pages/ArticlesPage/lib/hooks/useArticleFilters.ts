import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleViewMode, ArticleSortField, ArticleType } from "@/entities/Article";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/shared/types/sort";
import { ITabItem } from "@/shared/ui/deprecated/Tabs";
import {
    useArticlesView,
    useArticlesSortOrder,
    useArticlesSortField,
    useArticlesSearch,
    useArticlesType
} from "../../model/selectors/articlesSelectors";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useArticlesActions } from "../../model/slices/articlesPageSlice";

export const useArticleFilters = () => {
    const [, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const view = useArticlesView();
    const sortOrder = useArticlesSortOrder();
    const sortField = useArticlesSortField();
    const search = useArticlesSearch();
    const type = useArticlesType();

    const { setArticles, setOrder, setPage, setSearch, setSort, setType, setView } = useArticlesActions();

    const fetchData = useCallback(() => {
        setArticles({ articles: [], initialLoad: true });

        setPage(1);
        dispatch(fetchArticlesList({ initialLoad: true }));
    }, [dispatch, setArticles, setPage]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const setSearchParam = useCallback(
        (key: string, value: string) => {
            setSearchParams((prev) => {
                prev.set(key, value);
                return prev;
            });
        },
        [setSearchParams]
    );

    const onChangeView = useCallback(
        (view: ArticleViewMode) => {
            setView(view);
            fetchData();
        },
        [setView, fetchData]
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            setSearchParam("order", order);
            setOrder(order);
            fetchData();
        },
        [setSearchParam, setOrder, fetchData]
    );

    const onChangeSort = useCallback(
        (sortField: ArticleSortField) => {
            setSearchParam("sort", sortField);

            setSort(sortField);
            fetchData();
        },
        [fetchData, setSearchParam, setSort]
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            setSearchParam("search", search);
            setSearch(search);
            debouncedFetchData();
        },
        [debouncedFetchData, setSearch, setSearchParam]
    );

    const onChangeType = useCallback(
        (tabItem: ITabItem) => {
            setSearchParam("type", tabItem.value);
            setType(tabItem.value as ArticleType);
            fetchData();
        },
        [fetchData, setSearchParam, setType]
    );

    return {
        view,
        sortOrder,
        sortField,
        search,
        type,
        fetchData,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        onChangeView
    };
};
