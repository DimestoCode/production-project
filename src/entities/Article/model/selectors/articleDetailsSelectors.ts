import { IStoreState } from "@/app/providers/StoreProvider";

export const getArticleDetailsData = (state: IStoreState) => state.articleDetails?.data;
export const getArticleDetailsError = (state: IStoreState) => state.articleDetails?.error;
export const getArticleDetailsIsLoading = (state: IStoreState) => state.articleDetails?.isLoading;
