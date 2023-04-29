import { IStoreState } from "app/providers/StoreProvider";

export const getArticleRecommendationsIsLoading = (state: IStoreState) =>
    state.articleDetailsPage?.recommendations.isLoading;
export const getArticleRecommendationsError = (state: IStoreState) => state.articleDetailsPage?.recommendations.error;
