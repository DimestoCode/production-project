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
