import { EntityState } from "@reduxjs/toolkit";
import { IArticle } from "../../../../entities/Article/model/types/IArticle";

export interface IArticleRecommendationsState extends EntityState<IArticle> {
    isLoading?: boolean;
    error?: string;
}
