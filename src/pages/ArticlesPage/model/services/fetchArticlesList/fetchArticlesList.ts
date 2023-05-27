import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleType, IArticle } from "@/entities/Article";
import i18n from "@/shared/config/i18n/i18n";
import {
    getArticlesPageLimit,
    getArticlesPageNumber,
    getArticlesSearch,
    getArticlesSortField,
    getArticlesSortOrder,
    getArticlesType
} from "../../selectors/articlesSelectors";

interface IFetchArticlesListProps {
    initialLoad?: boolean;
}

interface IFetchArticleReturn extends IFetchArticlesListProps {
    articles: IArticle[];
}

export const fetchArticlesList = createAsyncThunk<IFetchArticleReturn, IFetchArticlesListProps, IThunkConfig<string>>(
    "articles/fetchArticlesList",
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { initialLoad = false } = props;
        const limit = getArticlesPageLimit(getState());
        const search = getArticlesSearch(getState());
        const sort = getArticlesSortField(getState());
        const order = getArticlesSortOrder(getState());
        const page = getArticlesPageNumber(getState());
        const type = getArticlesType(getState());

        try {
            const response = await extra.api.get<IArticle[]>("/articles", {
                params: {
                    _expand: "user",
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.All ? undefined : type,
                    q: search
                }
            });

            if (!response.data) {
                throw new Error();
            }

            return { articles: response.data, initialLoad };
        } catch (error) {
            return rejectWithValue(
                i18n.t("Server Error", {
                    ns: "common"
                })
            );
        }
    }
);
