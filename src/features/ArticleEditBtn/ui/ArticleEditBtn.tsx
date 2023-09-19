import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink";
import { getRouteArticleEdit } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Button } from "@/shared/ui/redesigned/Button";
import { getCanUserEditArticle } from "@/entities/Article";

interface IArticleEditBtnProps {
    className?: string;
}

export const ArticleEditBtn = memo(({ className }: IArticleEditBtnProps) => {
    const canUserEditArticle = useSelector(getCanUserEditArticle);
    const { articleId } = useParams<{ articleId: string }>();
    const { t } = useTranslation("article");
    const articlePageRoute = getRouteArticleEdit(`${articleId}`);

    return canUserEditArticle ? (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <AppLinkDeprecated className={className} to={articlePageRoute}>
                    <ButtonDeprecated theme={ButtonTheme.Outline}>{t("Edit")}</ButtonDeprecated>
                </AppLinkDeprecated>
            }
            on={
                <AppLink className={className} to={articlePageRoute}>
                    <Button variant="outlined">{t("Edit")}</Button>
                </AppLink>
            }
        />
    ) : null;
});
