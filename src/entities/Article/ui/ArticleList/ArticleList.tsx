import { HTMLAttributeAnchorTarget, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import uniqId from "uniqid";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/deprecated/Text";
import { ArticleViewMode, IArticle } from "../../model/types/IArticle";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import classes from "./ArticleList.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { HStack } from "@/shared/ui/redesigned/Stack";

interface IArticleListProps {
    className?: string;
    articles?: IArticle[];
    isLoading?: boolean;
    viewMode: ArticleViewMode;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (viewMode: ArticleViewMode) => {
    const isGrid = viewMode === "grid";

    return new Array(isGrid ? 9 : 3)
        .fill(ArticleListItemSkeleton)
        .map((Skeleton) => <Skeleton key={uniqId()} viewMode={viewMode} />);
};

export const ArticleList = memo(({ className, articles, isLoading, viewMode = "grid", target }: IArticleListProps) => {
    const { t } = useTranslation("articles");

    const renderArticle = useCallback(
        (article: IArticle) => (
            <ArticleListItem article={article} key={article.id} target={target} viewMode={viewMode} />
        ),
        [viewMode, target]
    );

    const articleListContent = (
        <>
            {!!articles?.length && articles.map(renderArticle)}
            {isLoading && getSkeletons(viewMode)}
            {!isLoading && !articles?.length && <Text title={t("Articles not found")} />}
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div
                    className={classNames(classes.ArticleList, {}, [className, classes[viewMode]])}
                    data-testid="ArticleList"
                >
                    {articleListContent}
                </div>
            }
            on={
                <HStack
                    className={classNames(classes.ArticleListRedesigned, {}, [classes[viewMode]])}
                    gap="16"
                    wrap="wrap"
                >
                    {articleListContent}
                </HStack>
            }
        />
    );
});
