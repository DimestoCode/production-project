import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Text } from "@/shared/ui/Text";
import { ArticleList } from "@/entities/Article";
import { getArticles } from "../../model/slices/articlesPageSlice";
import { useArticlesError, useArticlesIsLoading, useArticlesView } from "../../model/selectors/articlesSelectors";

interface IArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = memo(({ className }: IArticlesInfiniteListProps) => {
    const { t } = useTranslation("articles");
    const isLoading = useArticlesIsLoading();
    const view = useArticlesView();
    const articles = useSelector(getArticles.selectAll);
    const error = useArticlesError();

    if (error) {
        return <Text title={t("Articles not found")} />;
    }

    return <ArticleList articles={articles} className={className} isLoading={isLoading} viewMode={view} />;
});
