import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { ArticleViewMode } from "../../model/types/IArticle";
import classes from "./ArticleListItem.module.scss";
import { toggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";

interface IArticleListItemSkeletonProps {
    viewMode: ArticleViewMode;
}

export const ArticleListItemSkeleton = memo(({ viewMode }: IArticleListItemSkeletonProps) => {
    const isGrid = viewMode === "grid";

    const CardComponent = useMemo(() => {
        return toggleFeatures({ name: "isAppRedesigned", off: () => CardDeprecated, on: () => Card });
    }, []);

    const SkeletonComponent = useMemo(() => {
        return toggleFeatures({ name: "isAppRedesigned", off: () => SkeletonDeprecated, on: () => Skeleton });
    }, []);

    return (
        <div className={classNames(classes.ArticleListItem, {}, [classes[viewMode]])}>
            <CardComponent className={classes.card}>
                {isGrid ? (
                    <>
                        <div className={classes.imageWrapper}>
                            <SkeletonComponent className={classes.img} height={200} width={200} />
                        </div>
                        <div className={classes.infoWrapper}>
                            <SkeletonComponent height={16} width={130} />
                        </div>
                        <SkeletonComponent className={classes.title} height={16} width={150} />
                    </>
                ) : (
                    <>
                        <div className={classes.header}>
                            <SkeletonComponent borderRadius="50%" height={30} width={30} />
                            <SkeletonComponent className={classes.username} height={16} width={150} />
                            <SkeletonComponent className={classes.date} height={16} width={150} />
                        </div>
                        <SkeletonComponent className={classes.title} height={24} width={250} />
                        {/* <Skeleton className={classes.title} height={16} width={100} /> */}
                        <SkeletonComponent className={classes.img} height={250} width="100%" />
                        {/* {textBlock && <ArticleTextBlock block={textBlock} className={classes.textBlock} />} */}
                        <div className={classes.footer}>
                            <SkeletonComponent height={36} width={200} />
                        </div>
                    </>
                )}
            </CardComponent>
        </div>
    );
});
