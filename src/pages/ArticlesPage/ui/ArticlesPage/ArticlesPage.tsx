import { ArticleList, ArticleViewSelector } from "entities/Article";
import { ArticleViewMode } from "entities/Article/model/types/IArticle";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useActionEffect } from "shared/lib/hooks/useActionEffect/useActionEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { initializeArticles } from "pages/ArticlesPage/model/services/initializeArticles/initializeArticles";
import { Page } from "widgets/Page";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { getArticlesIsLoading, getArticlesView } from "../../model/selectors/articlesSelectors";
import { fetchFollowingArticles } from "../../model/services/fetchFollowingArticles/fetchFollowingArticles";
import { articlesActions, articlesReducer, getArticles } from "../../model/slices/articlesPageSlice";
import classes from "./ArticlesPage.module.scss";

const dynamicModules: IDynamicLoaderProps = {
    reducers: {
        articles: articlesReducer
    }
};

const ArticlesPage = () => {
    useDynamicModuleLoader(dynamicModules);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);
    const dispatch = useAppDispatch();

    useActionEffect(initializeArticles);

    const onChangeView = useCallback(
        (view: ArticleViewMode) => {
            dispatch(articlesActions.setView(view));
            dispatch(fetchArticlesList({ page: 1, initialLoad: true }));
        },
        [dispatch]
    );

    const onLoadNextPart = useCallback(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchFollowingArticles());
        }
    }, [dispatch]);

    return (
        <Page className={classNames(classes.ArticlesPage)} onScrollEnd={onLoadNextPart}>
            <ArticleViewSelector onViewClick={onChangeView} view={view} />
            <ArticleList articles={articles} isLoading={isLoading} viewMode={view} />
        </Page>
    );
};

export default memo(ArticlesPage);
