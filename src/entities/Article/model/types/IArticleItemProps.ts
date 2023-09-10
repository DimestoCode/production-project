import { HTMLAttributeAnchorTarget } from "react";
import { IArticle, ArticleViewMode } from "./IArticle";

export interface IArticleListItemProps {
    className?: string;
    article: IArticle;
    viewMode: ArticleViewMode;
    target?: HTMLAttributeAnchorTarget;
}
