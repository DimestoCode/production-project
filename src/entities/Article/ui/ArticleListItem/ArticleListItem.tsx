import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Text } from "@/shared/ui/Text/Text";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { Card } from "@/shared/ui/Card/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { RoutePath, AppRoutes } from "@/shared/const/router";
import { IArticleTextBlock } from "../../model/types/IArticleBlock";
import { ArticleViewMode, IArticle } from "../../model/types/IArticle";
import classes from "./ArticleListItem.module.scss";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";
import { ArticleBlockType } from "../../model/consts/consts";

interface IArticleListItemProps {
    className?: string;
    article: IArticle;
    viewMode: ArticleViewMode;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({ className, article, viewMode, target }: IArticleListItemProps) => {
    const { t } = useTranslation("articles");

    const isGrid = viewMode === "grid";
    const articleTypes = <Text className={classes.types} text={article.type.join(", ")} />;
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.Text) as IArticleTextBlock;

    const articleDetailsUrl = `${RoutePath[AppRoutes.ArticleDetails]}/${article.id}`;

    const views = (
        <>
            <Text className={classes.views} text={String(article.views)} />
            <Icon Svg={EyeIcon} />
        </>
    );

    return (
        <div className={classNames(classes.ArticleListItem, {}, [className, classes[viewMode]])}>
            <Card className={classes.card}>
                {isGrid ? (
                    <AppLink target={target} to={articleDetailsUrl}>
                        <div className={classes.imageWrapper}>
                            <img alt={article.title} className={classes.img} src={article.img} />
                            <Text className={classes.date} text={article.createdAt} />
                        </div>
                        <div className={classes.infoWrapper}>
                            {articleTypes}
                            {views}
                        </div>
                        <Text className={classes.title} text={article.title} />
                    </AppLink>
                ) : (
                    <>
                        <div className={classes.header}>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text className={classes.username} text={article.user.username} />
                            <Text className={classes.date} text={article.createdAt} />
                        </div>
                        <Text className={classes.title} text={article.title} />
                        {articleTypes}
                        <img alt={article.title} className={classes.img} src={article.img} />
                        {textBlock && <ArticleTextBlock block={textBlock} className={classes.textBlock} />}
                        <div className={classes.footer}>
                            <AppLink to={articleDetailsUrl}>
                                <Button theme={ButtonTheme.Outline}>{t("Read more")}</Button>
                            </AppLink>
                            {views}
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
});
