import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticleDetailsPage.module.scss";

const ArticleDetailsPage = () => {
    // const { t } = useTranslation("article");
    return <div className={classNames(classes.ArticleDetailsPage)}>&</div>;
};

export default memo(ArticleDetailsPage);
