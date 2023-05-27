import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { IArticle } from "@/entities/Article";

import { IArticleRecommendationsState } from "../../types/IArticleRecommandationsState";
import { fetchArticleRecommendations } from "../../services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<IStoreState>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
);

const articleRecommendationsSlice = createSlice({
    name: "articleRecommendations",
    initialState: recommendationsAdapter.getInitialState<IArticleRecommendationsState>({
        isLoading: false,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: articleRecommendationsReducer, actions: articleRecommendationsActions } =
    articleRecommendationsSlice;
