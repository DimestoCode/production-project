import { IStoreState } from "@/app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: IStoreState) => state.articleDetailsPage?.comments.isLoading;
export const getArticleCommentsError = (state: IStoreState) => state.articleDetailsPage?.comments.error;
