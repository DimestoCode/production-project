import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import uniqId from "uniqid";
import { ArticleViewMode, IArticle } from "../../model/types/IArticle";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import classes from "./ArticleList.module.scss";

interface IArticleListProps {
    className?: string;
    articles: IArticle[];
    isLoading?: boolean;
    viewMode: ArticleViewMode;
}

const getSkeletons = (viewMode: ArticleViewMode) => {
    const isGrid = viewMode === "grid";

    return new Array(isGrid ? 9 : 3)
        .fill(ArticleListItemSkeleton)
        .map((Skeleton) => <Skeleton key={uniqId()} viewMode={viewMode} />);
};

export const ArticleList = memo(({ className, articles, isLoading, viewMode = "grid" }: IArticleListProps) => {
    const renderArticle = useCallback(
        (article: IArticle) => <ArticleListItem article={article} key={article.id} viewMode={viewMode} />,
        [viewMode]
    );

    if (isLoading) {
        return <div className={classNames(classes.ArticleList, {}, [classes[viewMode]])}>{getSkeletons(viewMode)}</div>;
    }

    return (
        <div className={classNames(classes.ArticleList, {}, [className, classes[viewMode]])}>
            {!!articles.length && articles.map(renderArticle)}
        </div>
    );
});
