import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { initializeArticles } from "../../model/services/initializeArticles/initializeArticles";
import { getArticlesHasMore, getArticlesInitialized } from "../../model/selectors/articlesSelectors";
import { fetchFollowingArticles } from "../../model/services/fetchFollowingArticles/fetchFollowingArticles";
import { articlesReducer, getArticles } from "../../model/slices/articlesPageSlice";
import classes from "./ArticlesPage.module.scss";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { ArticlesInfiniteList } from "../ArticlesInfiniteList/ArticlesInfiniteList";

const dynamicModules: IDynamicLoaderProps = {
    reducers: {
        articles: articlesReducer
    }
};

const ArticlesPage = () => {
    const [searchParams] = useSearchParams();
    useDynamicModuleLoader(dynamicModules);

    const articles = useSelector(getArticles.selectAll);
    const hasMoreArticles = useSelector(getArticlesHasMore);
    const dispatch = useAppDispatch();
    const initialized = useSelector(getArticlesInitialized);

    useActionEffect(() => initializeArticles(searchParams), !initialized);

    const onLoadNextPart = useCallback(() => {
        if (!!articles.length && hasMoreArticles) {
            dispatch(fetchFollowingArticles());
        }
    }, [articles.length, dispatch, hasMoreArticles]);

    return (
        <Page className={classNames(classes.ArticlesPage)} onScrollEnd={onLoadNextPart}>
            <ArticlesPageFilters />
            <ArticlesInfiniteList className={classes.list} />
        </Page>
    );
};

export default memo(ArticlesPage);
