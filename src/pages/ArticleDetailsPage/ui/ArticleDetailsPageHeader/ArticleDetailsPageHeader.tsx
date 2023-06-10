import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppLink } from "@/shared/ui/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
import { getCanUserEditArticle } from "../../model/selectors/article/article";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";

interface IArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: IArticleDetailsPageHeaderProps) => {
    const { articleId } = useParams<{ articleId: string }>();
    const { t } = useTranslation("article");
    const canUserEditArticle = useSelector(getCanUserEditArticle);

    return (
        <HStack className={className} gap="8" justify="between" maxWidth>
            <AppLink to={getRouteArticles()}>
                <Button theme={ButtonTheme.Outline}>{t("Back to list")}</Button>
            </AppLink>

            {canUserEditArticle && (
                <AppLink to={getRouteArticleEdit(`${articleId}`)}>
                    <Button theme={ButtonTheme.Outline}>{t("Edit")}</Button>
                </AppLink>
            )}
        </HStack>
    );
});
