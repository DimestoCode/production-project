import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieveArticleById } from "../services/retrieveArticleById/retrieveArticleById";
import { IArticle } from "../types/IArticle";
import { IArticleState } from "../types/IArticleState";

const initialState: IArticleState = {
    isLoading: false,
    error: undefined,
    data: undefined
};

export const articleDetailsSlice = createSlice({
    name: "articleDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(retrieveArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(retrieveArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: articleDetailsActions, reducer: articleDetailsReducer } = articleDetailsSlice;
