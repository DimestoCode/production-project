import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { HStack } from "shared/ui/Stack";
import { getCanUserEditArticle } from "../../model/selectors/article/article";

interface IArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: IArticleDetailsPageHeaderProps) => {
    const { articleId } = useParams<{ articleId: string }>();
    const { t } = useTranslation("article");
    const canUserEditArticle = useSelector(getCanUserEditArticle);

    return (
        <HStack className={className} gap="8" justify="between" maxWidth>
            <AppLink to={RoutePath.articles}>
                <Button theme={ButtonTheme.Outline}>{t("Back to list")}</Button>
            </AppLink>

            {canUserEditArticle && (
                <AppLink to={`${RoutePath.articles}/${articleId}/edit`}>
                    <Button theme={ButtonTheme.Outline}>{t("Edit")}</Button>
                </AppLink>
            )}
        </HStack>
    );
});
