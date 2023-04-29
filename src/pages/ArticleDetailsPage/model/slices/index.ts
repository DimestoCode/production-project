import { combineReducers } from "@reduxjs/toolkit";
import { IArticleDetailsPageState } from "../types";
import { articleCommentsReducer } from "./articleCommentsSlice/articleCommentsSlice";
import { articleRecommendationsReducer } from "./articleDetailsRecommendationsSlice/articleDetailsRecommendationsSlice";

export const articleDetailsPageReducer = combineReducers<IArticleDetailsPageState>({
    comments: articleCommentsReducer,
    recommendations: articleRecommendationsReducer
});
