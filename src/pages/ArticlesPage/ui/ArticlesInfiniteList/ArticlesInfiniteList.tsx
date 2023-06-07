import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text";
import { ArticleList } from "@/entities/Article";
import { getArticles } from "../../model/slices/articlesPageSlice";
import { getArticlesError, getArticlesIsLoading, getArticlesView } from "../../model/selectors/articlesSelectors";

interface IArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = memo(({ className }: IArticlesInfiniteListProps) => {
    const { t } = useTranslation("articles");
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesError);

    if (error) {
        return <Text title={t("Articles not found")} />;
    }

    return <ArticleList articles={articles} className={className} isLoading={isLoading} viewMode={view} />;
});
