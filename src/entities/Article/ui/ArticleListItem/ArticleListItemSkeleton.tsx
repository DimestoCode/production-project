import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/deprecated/Card";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { ArticleViewMode } from "../../model/types/IArticle";
import classes from "./ArticleListItem.module.scss";

interface IArticleListItemSkeletonProps {
    viewMode: ArticleViewMode;
}

export const ArticleListItemSkeleton = memo(({ viewMode }: IArticleListItemSkeletonProps) => {
    const isGrid = viewMode === "grid";
    return (
        <div className={classNames(classes.ArticleListItem, {}, [classes[viewMode]])}>
            <Card className={classes.card}>
                {isGrid ? (
                    <>
                        <div className={classes.imageWrapper}>
                            <Skeleton className={classes.img} height={200} width={200} />
                        </div>
                        <div className={classes.infoWrapper}>
                            <Skeleton height={16} width={130} />
                        </div>
                        <Skeleton className={classes.title} height={16} width={150} />
                    </>
                ) : (
                    <>
                        <div className={classes.header}>
                            <Skeleton borderRadius="50%" height={30} width={30} />
                            <Skeleton className={classes.username} height={16} width={150} />
                            <Skeleton className={classes.date} height={16} width={150} />
                        </div>
                        <Skeleton className={classes.title} height={24} width={250} />
                        {/* <Skeleton className={classes.title} height={16} width={100} /> */}
                        <Skeleton className={classes.img} height={250} width="100%" />
                        {/* {textBlock && <ArticleTextBlock block={textBlock} className={classes.textBlock} />} */}
                        <div className={classes.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
});
