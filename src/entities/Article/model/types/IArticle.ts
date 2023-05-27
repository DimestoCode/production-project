import { IUser } from "@/entities/User";
import { ArticleType } from "../consts/consts";
import { IArticleBlock } from "./IArticleBlock";

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
