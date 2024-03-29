import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IArticleTextBlock } from "../../../model/types/IArticleBlock";
import { ArticleBlockType } from "../../../testing";
import { getRouteArticleDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Card } from "@/shared/ui/deprecated/Card";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { ArticleTextBlock } from "../../ArticleTextBlock/ArticleTextBlock";
import { Text } from "@/shared/ui/deprecated/Text";
import classes from "./ArticleListItemDeprecated.module.scss";
import { IArticleListItemProps } from "../../../model/types/IArticleItemProps";
import EyeIcon from "@/shared/assets/icons/eye.svg";

export const ArticleListItemDeprecated = memo(({ className, article, viewMode, target }: IArticleListItemProps) => {
    const { t } = useTranslation("articles");

    const isGrid = viewMode === "grid";
    const articleTypes = <Text className={classes.types} text={article.type.join(", ")} />;
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.Text) as IArticleTextBlock;

    const views = (
        <>
            <Text className={classes.views} text={String(article.views)} />
            <Icon Svg={EyeIcon} />
        </>
    );

    return (
        <div
            className={classNames(classes.ArticleListItem, {}, [className, classes[viewMode]])}
            data-testid="ArticleListItem"
        >
            <Card className={classes.card}>
                {isGrid ? (
                    <AppLink target={target} to={getRouteArticleDetails(String(article.id))}>
                        <div className={classes.imageWrapper}>
                            <AppImage
                                alt={article.title}
                                className={classes.img}
                                fallback={<Skeleton height="200px" width="200px" />}
                                src={article.img}
                            />
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
                        <AppImage
                            alt={article.title}
                            className={classes.img}
                            fallback={<Skeleton height={250} width="100%" />}
                            src={article.img}
                        />

                        {textBlock && <ArticleTextBlock block={textBlock} className={classes.textBlock} />}
                        <div className={classes.footer}>
                            <AppLink to={getRouteArticleDetails(String(article.id))}>
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
