import { ArticleDetails } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/AddCommentForm";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { useActionEffect } from "shared/lib/hooks/useActionEffect/useActionEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Text } from "shared/ui/Text/Text";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "widgets/Page";
import { getArticleCommentsIsLoading } from "../../model/selectors/commentsSelectors";
import { retrieveCommentsByArticleId } from "../../model/services/retrieveCommentsByArticleId/retrieveCommentsByArticleId";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { articleCommentsReducer, getArticleComments } from "../../model/slices/articleCommentsSlice";
import classes from "./ArticleDetailsPage.module.scss";

const dynamicModule: IDynamicLoaderProps = {
    reducers: {
        articleComments: articleCommentsReducer
    }
};

const ArticleDetailsPage = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation("article");
    const { articleId } = useParams<{ articleId: string }>();
    const fetchArticleCommentsCallback = useCallback(() => retrieveCommentsByArticleId(Number(articleId)), [articleId]);

    useDynamicModuleLoader(dynamicModule);
    useActionEffect(fetchArticleCommentsCallback);

    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    const onCommentSubmit = useCallback(
        (comment: string) => {
            dispatch(addCommentForArticle(comment));
        },
        [dispatch]
    );

    if (!articleId) {
        <Page className={classNames(classes.ArticleDetailsPage)}>{t("Article is not found")}</Page>;
    }

    return (
        <Page className={classNames(classes.ArticleDetailsPage)}>
            <AppLink to={RoutePath.articles}>
                <Button theme={ButtonTheme.Outline}>{t("Back to list")}</Button>
            </AppLink>
            <ArticleDetails id={Number(articleId)} />
            <Text className={classes.commentTitle} title={t("Comments")} />
            <AddCommentForm onCommentSubmit={onCommentSubmit} />
            <CommentList comments={comments} isLoading={isLoading} />
        </Page>
    );
});

export default memo(ArticleDetailsPage);
