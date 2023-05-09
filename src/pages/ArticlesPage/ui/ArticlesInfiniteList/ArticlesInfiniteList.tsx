import { ArticleList } from "entities/Article";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
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
