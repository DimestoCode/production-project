import { IStoreState } from "app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: IStoreState) => state.articleComments?.isLoading;
export const getArticleCommentsError = (state: IStoreState) => state.articleComments?.error;
