import { IRating } from "@/entities/Rating";
import { rtkApi } from "@/shared/api/rtkApi";

interface IGetArticleRatingParams {
    userId: number;
    articleId: number;
}

interface IPostArticleRatingParams {
    userId: number;
    articleId: number;
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<IRating[], IGetArticleRatingParams>({
            query: (params) => ({
                url: "/article-ratings",
                params
            })
        }),
        rateArticle: build.mutation<void, IPostArticleRatingParams>({
            query: (params) => ({
                url: "/article-ratings",
                method: "POST",
                body: params
            })
        })
    })
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
