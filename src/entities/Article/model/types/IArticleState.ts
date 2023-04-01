import { IArticle } from "./IArticle";

export interface IArticleState {
    isLoading: boolean;
    error?: string;
    data?: IArticle;
}
