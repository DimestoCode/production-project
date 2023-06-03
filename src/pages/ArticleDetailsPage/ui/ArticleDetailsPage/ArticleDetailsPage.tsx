import { memo } from "react";
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
import { ArticleRating } from "@/features/ArticleRating";

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

    if (!articleId) {
        return <Page className={classNames(classes.ArticleDetailsPage)}>{t("Article is not found")}</Page>;
    }

    return (
        <Page className={classNames(classes.ArticleDetailsPage)}>
            <VStack gap="16" maxWidth>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={Number(articleId)} />
                <ArticleRating articleId={Number(articleId)} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments articleId={Number(articleId)} />
            </VStack>
        </Page>
    );
});

export default memo(ArticleDetailsPage);
