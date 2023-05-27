import { EntityState } from "@reduxjs/toolkit";
import { ArticleSortField, ArticleType, ArticleViewMode, IArticle } from "@/entities/Article";

export interface IArticlesState extends EntityState<IArticle> {
    initialized: boolean;
    isLoading?: boolean;
    error?: string;

    // Pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // Filters
    view: ArticleViewMode;
    order: "asc" | "desc";
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
}
