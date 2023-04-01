import { IArticleBlock } from "./IArticleBlock";

export enum ArticleType {
    IT = "IT",
    Science = "Science",
    Economics = "Economics"
}

export interface IArticle {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: IArticleBlock[];
}
