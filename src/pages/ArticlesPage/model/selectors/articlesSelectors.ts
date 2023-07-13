import { IStoreState } from "@/app/providers/StoreProvider";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useArticlesIsLoading, getArticlesIsLoading] = buildSelector(
    (state: IStoreState) => state.articles?.isLoading ?? false
);

export const [useArticlesError, getArticlesError] = buildSelector((state: IStoreState) => state.articles?.error ?? "");

export const [useArticlesView, getArticlesView] = buildSelector((state: IStoreState) => state.articles?.view ?? "grid");

export const [useArticlesPageNumber, getArticlesPageNumber] = buildSelector(
    (state: IStoreState) => state.articles?.page ?? 1
);

export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
    (state: IStoreState) => state.articles?.limit ?? 9
);

export const [useArticlesHasMore, getArticlesHasMore] = buildSelector((state: IStoreState) => state.articles?.hasMore);

export const [useArticlesInitialized, getArticlesInitialized] = buildSelector(
    (state: IStoreState) => state.articles?.initialized
);

export const [useArticlesSortField, getArticlesSortField] = buildSelector(
    (state: IStoreState) => state.articles?.sort ?? ArticleSortField.CreatedAt
);

export const [useArticlesSortOrder, getArticlesSortOrder] = buildSelector(
    (state: IStoreState) => state.articles?.order ?? "asc"
);

export const [useArticlesSearch, getArticlesSearch] = buildSelector(
    (state: IStoreState) => state.articles?.search ?? ""
);

export const [useArticlesType, getArticlesType] = buildSelector(
    (state: IStoreState) => state.articles?.type ?? ArticleType.All
);
