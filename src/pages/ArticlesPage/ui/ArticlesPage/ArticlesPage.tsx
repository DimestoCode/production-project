import { memo } from "react";
// import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticlesPage.module.scss";

const ArticlesPage = () => {
    // const { t } = useTranslation("articles");
    return <div className={classNames(classes.ArticlesPage)}>&</div>;
};

export default memo(ArticlesPage);
