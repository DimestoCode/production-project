import { lazy, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecommendationsList } from "@/features/ArticleRecommendationsList";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../../ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import classes from "./ArticleDetailsPage.module.scss";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { toggleFeatures } from "@/shared/lib/features";

const Card = lazy(async () => {
    return import("@/shared/ui/Card").then(({ Card }) => ({ default: Card }));
});
const ArticleRating = lazy(async () => {
    return import("@/features/ArticleRating").then(({ ArticleRating }) => ({ default: ArticleRating }));
});

const dynamicModule: IDynamicLoaderProps = {
    reducers: {
        articleDetailsPage: articleDetailsPageReducer
    },
    removeOnUnmount: true
};

const ArticleDetailsPage = memo(() => {
    const { t } = useTranslation("article");
    const { articleId } = useParams<{ articleId: string }>();

    useDynamicModuleLoader(dynamicModule);

    const articleRating = toggleFeatures({
        name: "isArticleRatingEnabled",
        off: useCallback(() => <Card>{t("Rating section is being developed")}</Card>, [t]),
        on: useCallback(() => <ArticleRating articleId={Number(articleId)} />, [articleId])
    });

    if (!articleId) {
        return <Page className={classNames(classes.ArticleDetailsPage)}>{t("Article is not found")}</Page>;
    }

    return (
        <Page className={classNames(classes.ArticleDetailsPage)}>
            <VStack gap="16" maxWidth>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={Number(articleId)} />
                {articleRating}
                <ArticleRecommendationsList />
                <ArticleDetailsComments articleId={Number(articleId)} />
            </VStack>
        </Page>
    );
});

export default memo(ArticleDetailsPage);
