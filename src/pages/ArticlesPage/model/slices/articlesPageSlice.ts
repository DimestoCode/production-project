import { createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { ArticleSortField, ArticleType, ArticleViewMode, IArticle } from "@/entities/Article";
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { SortOrder } from "@/shared/types";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { IArticlesState } from "../types/IArticlesState";
import { buildSlice } from "@/shared/lib/store";

const articlesAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id
});

export const getArticles = articlesAdapter.getSelectors<IStoreState>(
    (state) => state.articles || articlesAdapter.getInitialState()
);

const storageArticleMode = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleViewMode;
const articlesSlice = buildSlice({
    name: "articles",
    initialState: articlesAdapter.getInitialState<IArticlesState>({
        initialized: false,
        isLoading: true,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        view: storageArticleMode || "grid",
        limit: storageArticleMode === "list" ? 4 : 9,
        order: "asc",
        search: "",
        sort: ArticleSortField.CreatedAt,
        type: ArticleType.All
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleViewMode>) => {
            state.view = action.payload;
            state.limit = action.payload === "list" ? 4 : 9;
            state.page = 1;
            localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setArticles: (state, action: PayloadAction<{ articles: IArticle[]; initialLoad?: boolean }>) => {
            const { articles, initialLoad } = action.payload;

            if (initialLoad) {
                articlesAdapter.setAll(state, articles);
                state.hasMore = articles.length === state.limit;
            } else {
                articlesAdapter.addMany(state, articles);
                state.hasMore = articles.length >= state?.limit;
            }
        },
        initializeState: (state) => {
            state.initialized = true;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action: PayloadAction<{ articles: IArticle[]; initialLoad?: boolean }>) => {
                    const { articles, initialLoad } = action.payload;
                    state.isLoading = false;

                    if (initialLoad) {
                        articlesAdapter.setAll(state, articles);
                        state.hasMore = articles.length === state.limit;
                    } else {
                        articlesAdapter.addMany(state, articles);
                        state.hasMore = articles.length >= state?.limit;
                    }
                }
            )
            .addCase(fetchArticlesList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: articlesReducer, actions: articlesActions, useActions: useArticlesActions } = articlesSlice;
