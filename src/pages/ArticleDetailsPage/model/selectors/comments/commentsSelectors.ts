import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useArticleCommentsIsLoading, getArticleCommentsIsLoading] = buildSelector(
    (state: IStoreState) => state.articleDetailsPage?.comments.isLoading
);
export const [useArticleCommentsError, getArticleCommentsError] = buildSelector(
    (state: IStoreState) => state.articleDetailsPage?.comments.error
);
