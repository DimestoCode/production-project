import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { Text } from "@/shared/ui/deprecated/Text";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice/articleDetailsSlice";
import { retrieveArticleById } from "../../model/services/retrieveArticleById/retrieveArticleById";
import { useArticleDetailsError, useArticleDetailsIsLoading } from "../../model/selectors/articleDetailsSelectors";
import classes from "./ArticleDetails.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleDetailsDeprecated } from "./deprecated/ArticleDetailsDeprecated";
import { ArticleDetailsRedesigned } from "./redesigned/ArticleDetailsRedesigned";

const asyncModules: IDynamicLoaderProps = {
    reducers: { articleDetails: articleDetailsReducer }
};

export const ArticleDetails = memo(({ id }: { id: number }) => {
    useDynamicModuleLoader(asyncModules);

    const fetchArticleCallback = useCallback(() => retrieveArticleById(id), [id]);

    useActionEffect(fetchArticleCallback);

    const { t } = useTranslation("article");
    const isLoading = useArticleDetailsIsLoading();

    const error = useArticleDetailsError();

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
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ArticleDetailsDeprecated />}
                on={<ArticleDetailsRedesigned />}
            />
        </VStack>
    );
});
