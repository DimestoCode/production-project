import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Avatar } from "@/shared/ui/Avatar";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Text } from "@/shared/ui/Text";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";
import { Icon } from "@/shared/ui/Icon";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { HStack, VStack } from "@/shared/ui/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice/articleDetailsSlice";
import { retrieveArticleById } from "../../model/services/retrieveArticleById/retrieveArticleById";
import { IArticleBlock } from "../../model/types/IArticleBlock";
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading
} from "../../model/selectors/articleDetailsSelectors";
import classes from "./ArticleDetails.module.scss";
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock";
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";
import { ArticleBlockType } from "../../model/consts/consts";

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
    const isLoading = useArticleDetailsIsLoading();

    const error = useArticleDetailsError();
    const article = useArticleDetailsData();

    if (isLoading) {
        return (
            <VStack gap="16" maxWidth>
                <Skeleton borderRadius="50%" className={classes.avatar} height={200} width={200} />
                <Skeleton className={classes.skeleton} height={32} width={300} />
                <Skeleton className={classes.skeleton} height={24} width={600} />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
                <Skeleton className={classes.skeleton} height={200} width="100%" />
            </VStack>
        );
    }

    if (error) {
        return <Text align="center" title={t("The error occurred while loading the article")} />;
    }

    return (
        <VStack className={classes.ArticleDetails} gap="16" maxWidth>
            <HStack className={classes.avatarWrapper} justify="center" maxWidth>
                <Avatar className={classes.avatar} size={200} src={article?.img} />
            </HStack>
            <VStack data-testid="ArticleDetails.Info" gap="4">
                <Text className={classes.title} text={article?.subtitle} title={article?.title} />
                <HStack className={classes.articleInfo} gap="8">
                    <Icon Svg={EyeIcon} className={classes.icon} />
                    <Text text={String(article?.views)} />
                </HStack>

                <HStack className={classes.articleInfo} gap="8">
                    <Icon Svg={CalendarIcon} className={classes.icon} />
                    <Text text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(renderBlock)}
        </VStack>
    );
});
