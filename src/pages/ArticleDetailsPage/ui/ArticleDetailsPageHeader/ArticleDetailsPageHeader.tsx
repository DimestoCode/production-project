import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getCanUserEditArticle } from "../../model/selectors/article/article";
import classes from "./ArticleDetailsPageHeader.module.scss";

interface IArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: IArticleDetailsPageHeaderProps) => {
    const { articleId } = useParams<{ articleId: string }>();
    const { t } = useTranslation("article");
    const canUserEditArticle = useSelector(getCanUserEditArticle);

    return (
        <div className={classNames(classes.ArticleDetailsPageHeader, {}, [className])}>
            <AppLink to={RoutePath.articles}>
                <Button theme={ButtonTheme.Outline}>{t("Back to list")}</Button>
            </AppLink>

            {canUserEditArticle && (
                <AppLink className={classes.editBtn} to={`${RoutePath.articles}/${articleId}/edit`}>
                    <Button theme={ButtonTheme.Outline}>{t("Edit")}</Button>
                </AppLink>
            )}
        </div>
    );
});
