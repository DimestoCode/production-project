import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice/articleDetailsSlice";
import { retrieveArticleById } from "../../model/services/retrieveArticleById/retrieveArticleById";
import { useArticleDetailsError, useArticleDetailsIsLoading } from "../../model/selectors/articleDetailsSelectors";
import classes from "./ArticleDetails.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleDetailsDeprecated } from "./deprecated/ArticleDetailsDeprecated";
import { ArticleDetailsRedesigned } from "./redesigned/ArticleDetailsRedesigned";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

const asyncModules: IDynamicLoaderProps = {
    reducers: { articleDetails: articleDetailsReducer }
};

const ArticleDetailsSkeleton = () => {
    return (
        <VStack gap="16" maxWidth>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <>
                        <SkeletonDeprecated borderRadius="50%" className={classes.avatar} height={200} width={200} />
                        <SkeletonDeprecated className={classes.skeleton} height={32} width={300} />
                        <SkeletonDeprecated className={classes.skeleton} height={24} width={600} />
                        <SkeletonDeprecated className={classes.skeleton} height={200} width="100%" />
                        <SkeletonDeprecated className={classes.skeleton} height={200} width="100%" />
                    </>
                }
                on={
                    <>
                        <Skeleton borderRadius="5" height={40} width="100%" />
                        <Skeleton borderRadius="5" height={40} width="100%" />
                        <Skeleton height={420} width="100%" />
                        <Skeleton height={200} width="100%" />
                        <Skeleton height={200} width="100%" />
                    </>
                }
            />
        </VStack>
    );
};

export const ArticleDetails = memo(({ id }: { id: number }) => {
    useDynamicModuleLoader(asyncModules);

    const fetchArticleCallback = useCallback(() => retrieveArticleById(id), [id]);

    useActionEffect(fetchArticleCallback);

    const { t } = useTranslation("article");
    const isLoading = useArticleDetailsIsLoading();

    const error = useArticleDetailsError();

    if (isLoading) {
        return <ArticleDetailsSkeleton />;
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<TextDeprecated align="center" title={t("The error occurred while loading the article")} />}
                on={<Text align="center" title={t("The error occurred while loading the article")} />}
            />
        );
    }

    return (
        <VStack className={classes.ArticleDetails} gap="16" maxWidth>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ArticleDetailsDeprecated />}
                on={<ArticleDetailsRedesigned />}
            />
        </VStack>
    );
});
