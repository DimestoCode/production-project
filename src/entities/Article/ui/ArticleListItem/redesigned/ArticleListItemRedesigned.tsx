import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IArticleListItemProps } from "../../../model/types/IArticleItemProps";
import classes from "./ArticleListItemRedesigned.module.scss";
import { IArticleTextBlock } from "../../../model/types/IArticleBlock";
import { ArticleBlockType } from "../../../testing";
import { getRouteArticleDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { ArticleTextBlock } from "../../ArticleTextBlock/ArticleTextBlock";
import { Text } from "@/shared/ui/redesigned/Text";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import EyeIcon from "@/shared/assets/icons/eye-redesigned.svg";

export const ArticleListItemRedesigned = memo<IArticleListItemProps>(({ article, viewMode, className, target }) => {
    const { t } = useTranslation("articles");

    const isGrid = viewMode === "grid";
    const articleTypes = <Text className={classes.types} text={article.type.join(", ")} />;
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.Text) as IArticleTextBlock;

    const views = (
        <HStack gap="8">
            <Text className={classes.views} text={String(article.views)} />
            <Icon Svg={EyeIcon} />
        </HStack>
    );

    return (
        <Card
            className={classNames(classes.ArticleListItemRedesigned, {}, [className, classes[viewMode]])}
            data-testid="ArticleListItem"
            padding="24"
            fullWidth
        >
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
                <VStack gap="16" maxWidth>
                    <HStack gap="8" maxWidth>
                        <Avatar size={32} src={article.user.avatar} />
                        <Text text={article.user.username} bold />
                        <Text text={article.createdAt} />
                    </HStack>

                    {/* <div className={classes.header}></div> */}
                    <Text size="L" title={article.title} bold />
                    <Text size="L" text={article.subtitle} />
                    {/* {articleTypes} */}
                    <AppImage
                        alt={article.title}
                        className={classes.img}
                        fallback={<Skeleton height={250} width="100%" />}
                        src={article.img}
                    />
                    {textBlock && <ArticleTextBlock block={textBlock} className={classes.textBlock} />}

                    <HStack justify="between" maxWidth>
                        <AppLink to={getRouteArticleDetails(String(article.id))}>
                            <Button>{t("Read more")}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            )}
        </Card>
    );
});
