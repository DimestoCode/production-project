import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { IComment } from "@/entities/Comment";
import { retrieveCommentsByArticleId } from "../../services/retrieveCommentsByArticleId/retrieveCommentsByArticleId";
import { IArticleCommentsState } from "../../types/IArticleCommentsState";

const commentsAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment.id
});

export const getArticleComments = commentsAdapter.getSelectors<IStoreState>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
);

const articleCommentsSlice = createSlice({
    name: "articleComments",
    initialState: commentsAdapter.getInitialState<IArticleCommentsState>({
        isLoading: true,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(retrieveCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(retrieveCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: articleCommentsReducer, actions: articleCommentsActions } = articleCommentsSlice;
