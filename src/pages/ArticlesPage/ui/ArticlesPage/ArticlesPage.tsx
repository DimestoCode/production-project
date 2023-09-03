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
import { useArticlesHasMore, useArticlesInitialized } from "../../model/selectors/articlesSelectors";
import { fetchFollowingArticles } from "../../model/services/fetchFollowingArticles/fetchFollowingArticles";
import { articlesReducer, getArticles } from "../../model/slices/articlesPageSlice";
import classes from "./ArticlesPage.module.scss";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { ArticlesInfiniteList } from "../ArticlesInfiniteList/ArticlesInfiniteList";
import { ToggleFeatures } from "@/shared/lib/features";
import { StickyLayout } from "@/shared/layouts/StickyLayout";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";

const dynamicModules: IDynamicLoaderProps = {
    reducers: {
        articles: articlesReducer
    }
};

const ArticlesPage = () => {
    const [searchParams] = useSearchParams();
    useDynamicModuleLoader(dynamicModules);

    const articles = useSelector(getArticles.selectAll);
    const hasMoreArticles = useArticlesHasMore();
    const dispatch = useAppDispatch();
    const initialized = useArticlesInitialized();

    useActionEffect(() => initializeArticles(searchParams), !initialized);

    const onLoadNextPart = useCallback(() => {
        if (!!articles.length && hasMoreArticles) {
            dispatch(fetchFollowingArticles());
        }
    }, [articles.length, dispatch, hasMoreArticles]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <Page
                    className={classNames(classes.ArticlesPage)}
                    data-testid="articles-page"
                    onScrollEnd={onLoadNextPart}
                >
                    <ArticlesPageFilters />
                    <ArticlesInfiniteList className={classes.list} />
                </Page>
            }
            on={
                <StickyLayout
                    content={
                        <Page
                            className={classNames(classes.ArticlesPageRedesigned)}
                            data-testid="articles-page"
                            onScrollEnd={onLoadNextPart}
                        >
                            <ArticlesInfiniteList className={classes.list} />
                        </Page>
                    }
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                />
            }
        />
    );
};

export default memo(ArticlesPage);
