import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useArticleDetailsData, getArticleDetailsData] = buildSelector(
    (state: IStoreState) => state.articleDetails?.data
);
export const [useArticleDetailsError, getArticleDetailsError] = buildSelector(
    (state: IStoreState) => state.articleDetails?.error
);
export const [useArticleDetailsIsLoading, getArticleDetailsIsLoading] = buildSelector(
    (state: IStoreState) => state.articleDetails?.isLoading
);
