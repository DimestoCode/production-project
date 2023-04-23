import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { getArticlesInitialized } from "../../selectors/articlesSelectors";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initializeArticles = createAsyncThunk<void, void, IThunkConfig<string>>(
    "articles/initializeArticles",
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const initialized = getArticlesInitialized(getState());

        if (!initialized) {
            dispatch(articlesActions.initializeState());
            dispatch(
                fetchArticlesList({
                    page: 1,
                    initialLoad: true
                })
            );
        }
    }
);
