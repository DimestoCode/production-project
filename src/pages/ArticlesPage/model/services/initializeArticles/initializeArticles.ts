import { createAsyncThunk } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { getArticlesInitialized } from "../../selectors/articlesSelectors";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

const mappedActions = {
    order: (param: string) => articlesActions.setOrder(param as SortOrder),
    sort: (param: string) => articlesActions.setSort(param as ArticleSortField),
    search: (param: string) => articlesActions.setSearch(param),
    type: (param: string) => articlesActions.setType(param as ArticleType)
};

export const initializeArticles = createAsyncThunk<void, URLSearchParams, IThunkConfig<string>>(
    "articles/initializeArticles",
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const initialized = getArticlesInitialized(getState());

        if (!initialized) {
            dispatch(articlesActions.initializeState());
            Object.entries(mappedActions).forEach(([key, action]) => {
                const param = searchParams.get(key);
                if (!isNil(param)) {
                    dispatch(action(param));
                }
            });
            dispatch(
                fetchArticlesList({
                    initialLoad: true
                })
            );
        }
    }
);
