import { IUser } from "entities/User";
import { IArticleBlock } from "./IArticleBlock";

export enum ArticleType {
    All = "all",
    IT = "it",
    Science = "science",
    Economics = "economics"
}

export enum ArticleSortField {
    Views = "views",
    Title = "title",
    CreatedAt = "createdAt"
}

export interface IArticle {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    user: IUser;
    blocks: IArticleBlock[];
}

export type ArticleViewMode = "grid" | "list";
