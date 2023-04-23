import { IStoreState } from "app/providers/StoreProvider";

export const getArticlesIsLoading = (state: IStoreState) => state.articles?.isLoading ?? false;

export const getArticlesError = (state: IStoreState) => state.articles?.error ?? "";

export const getArticlesView = (state: IStoreState) => state.articles?.view ?? "grid";

export const getArticlesPageNumber = (state: IStoreState) => state.articles?.page ?? 1;

export const getArticlesPageLimit = (state: IStoreState) => state.articles?.limit ?? 9;

export const getArticlesHasMore = (state: IStoreState) => state.articles?.hasMore;

export const getArticlesInitialized = (state: IStoreState) => state.articles?.initialized;
