import { IArticleCommentsState } from "./IArticleCommentsState";
import { IArticleRecommendationsState } from "./IArticleRecommandationsState";

export interface IArticleDetailsPageState {
    comments: IArticleCommentsState;
    recommendations: IArticleRecommendationsState;
}
