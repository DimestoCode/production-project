import { memo } from "react";
import { useTranslation } from "react-i18next";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { ArticleEditBtn } from "@/features/ArticleEditBtn";
import { getRouteArticles } from "@/shared/const/router";

interface IArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: IArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation("article");

    return (
        <HStack className={className} gap="8" justify="between" maxWidth>
            <AppLink to={getRouteArticles()}>
                <Button theme={ButtonTheme.Outline}>{t("Back to list")}</Button>
            </AppLink>

            <ArticleEditBtn />
        </HStack>
    );
});
