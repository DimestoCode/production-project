import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { IArticle } from "entities/Article";
import i18n from "shared/config/i18n/i18n";
import { getArticlesPageLimit } from "../../selectors/articlesSelectors";
import { articlesActions } from "../../slices/articlesPageSlice";

interface IFetchArticlesListProps {
    page?: number;
    initialLoad?: boolean;
}
export const fetchArticlesList = createAsyncThunk<IArticle[], IFetchArticlesListProps, IThunkConfig<string>>(
    "articles/fetchArticlesList",
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkApi;
        const { page = 1, initialLoad = false } = props;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<IArticle[]>("/articles", {
                params: {
                    _expand: "user",
                    _limit: limit,
                    _page: page
                }
            });

            if (!response.data) {
                throw new Error();
            }

            console.log("here");

            dispatch(articlesActions.setArticles({ articles: response.data, initialLoad }));

            return response.data;
        } catch (error) {
            return rejectWithValue(
                i18n.t("Server Error", {
                    ns: "common"
                })
            );
        }
    }
);
