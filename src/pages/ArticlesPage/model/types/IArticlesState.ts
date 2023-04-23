import { EntityState } from "@reduxjs/toolkit";
import { ArticleViewMode, IArticle } from "entities/Article";

export interface IArticlesState extends EntityState<IArticle> {
    initialized: boolean;
    isLoading?: boolean;
    error?: string;
    view: ArticleViewMode;
    page: number;
    limit?: number;
    hasMore: boolean;
}
