import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticlesPage.module.scss";

const ArticlesPage = () => {
    return <div className={classNames(classes.ArticlesPage)}>&</div>;
};

export default memo(ArticlesPage);
