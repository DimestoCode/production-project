import { createSelector } from "@reduxjs/toolkit";
import { IStoreState } from "@/app/providers/StoreProvider";
import { getUserAuthData } from "@/entities/User";
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
export const getCanUserEditArticle = createSelector(getArticleDetailsData, getUserAuthData, (article, user) => {
    if (!article || !user) {
        return false;
    }

    return article.user.id === user.id;
});
