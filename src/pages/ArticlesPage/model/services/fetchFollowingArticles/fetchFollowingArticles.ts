import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { getArticlesHasMore, getArticlesIsLoading, getArticlesPageNumber } from "../../selectors/articlesSelectors";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchFollowingArticles = createAsyncThunk<void, void, IThunkConfig<string>>(
    "articles/fetchFollowingArticles",
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getArticlesHasMore(getState());
        const isLoading = getArticlesIsLoading(getState());
        const page = getArticlesPageNumber(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesActions.setPage(page + 1));
            dispatch(fetchArticlesList({ initialLoad: false }));
        }
    }
);
