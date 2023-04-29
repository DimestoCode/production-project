import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text } from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye.svg";
import CalendarIcon from "shared/assets/icons/calendar.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { useActionEffect } from "shared/lib/hooks/useActionEffect/useActionEffect";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice/articleDetailsSlice";
import { retrieveArticleById } from "../../model/services/retrieveArticleById/retrieveArticleById";
import { ArticleBlockType, IArticleBlock } from "../../model/types/IArticleBlock";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetailsSelectors";
import classes from "./ArticleDetails.module.scss";
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock";
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";

const asyncModules: IDynamicLoaderProps = {
    reducers: { articleDetails: articleDetailsReducer }
};

function renderBlock(block: IArticleBlock) {
    switch (block.type) {
        case ArticleBlockType.Code:
            return <ArticleCodeBlock block={block} className={classes.block} key={block.id} />;
        case ArticleBlockType.Image:
            return <ArticleImageBlock block={block} className={classes.block} key={block.id} />;
        case ArticleBlockType.Text:
            return <ArticleTextBlock block={block} className={classes.block} key={block.id} />;
        default:
            return null;
    }
}

export const ArticleDetails = memo(({ id }: { id: number }) => {
    useDynamicModuleLoader(asyncModules);

    const fetchArticleCallback = useCallback(() => retrieveArticleById(id), [id]);

    useActionEffect(fetchArticleCallback);

    const { t } = useTranslation("article");
    const isLoading = useSelector(getArticleDetailsIsLoading);

    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    if (isLoading) {
        return (
            <>
                <Skeleton borderRadius="50%" className={classes.avatar} height={200} width={200} />
                <Skeleton className={classes.skeleton} height={32} width={300} />
                <Skeleton className={classes.skeleton} height={24} width={600} />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
            </>
        );
    }

    if (error) {
        return <Text align="center" title={t("The error occurred while loading the article")} />;
    }

    return (
        <div className={classes.ArticleDetails}>
            <div className={classes.avatarWrapper}>
                <Avatar className={classes.avatar} size={200} src={article?.img} />
            </div>
            <Text className={classes.title} text={article?.subtitle} title={article?.title} />
            <div className={classes.articleInfo}>
                <Icon Svg={EyeIcon} className={classes.icon} />
                <Text text={String(article?.views)} />
            </div>

            <div className={classes.articleInfo}>
                <Icon Svg={CalendarIcon} className={classes.icon} />
                <Text text={article?.createdAt} />
            </div>

            {article?.blocks.map(renderBlock)}
        </div>
    );
});
