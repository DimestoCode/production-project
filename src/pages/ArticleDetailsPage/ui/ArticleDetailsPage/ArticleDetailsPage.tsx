import { ArticleDetails } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticleDetailsPage.module.scss";

const ArticleDetailsPage = () => {
    const { t } = useTranslation("article");
    const { articleId } = useParams<{ articleId: string }>();
    return (
        <div className={classNames(classes.ArticleDetailsPage)}>
            {articleId ? <ArticleDetails id={Number(articleId)} /> : t("Article is not found")}
        </div>
    );
};

export default memo(ArticleDetailsPage);
