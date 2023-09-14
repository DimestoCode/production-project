import { IArticle } from "@/entities/Article";
import { rtkApi } from "@/shared/api/rtkApi";

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<IArticle[], number>({
            query: (limit: number) => ({
                url: "/articles",
                params: {
                    _limit: limit,
                    _expand: "user"
                }
            })
        })
    })
});

export const { useGetArticleRecommendationsListQuery } = recommendationsApi;
