import { ArticleList } from "entities/Article";
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
import { useSearchParams } from "react-router-dom";
import { getArticlesInitialized, getArticlesIsLoading, getArticlesView } from "../../model/selectors/articlesSelectors";
import { fetchFollowingArticles } from "../../model/services/fetchFollowingArticles/fetchFollowingArticles";
import { articlesReducer, getArticles } from "../../model/slices/articlesPageSlice";
import classes from "./ArticlesPage.module.scss";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";

const dynamicModules: IDynamicLoaderProps = {
    reducers: {
        articles: articlesReducer
    }
};

const ArticlesPage = () => {
    const [searchParams] = useSearchParams();
    useDynamicModuleLoader(dynamicModules);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);
    const dispatch = useAppDispatch();
    const initialized = useSelector(getArticlesInitialized);

    useActionEffect(() => initializeArticles(searchParams), !initialized);

    const onLoadNextPart = useCallback(() => {
        if (!!articles.length && __PROJECT__ !== "storybook") {
            dispatch(fetchFollowingArticles());
        }
    }, [articles.length, dispatch]);

    return (
        <Page className={classNames(classes.ArticlesPage)} onScrollEnd={onLoadNextPart}>
            <ArticlesPageFilters />

            <ArticleList articles={articles} className={classes.list} isLoading={isLoading} viewMode={view} />
        </Page>
    );
};

export default memo(ArticlesPage);
