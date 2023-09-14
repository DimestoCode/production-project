import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { ArticleViewMode } from "../../model/types/IArticle";
import classes from "./ArticleListItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card, ICardProps } from "@/shared/ui/redesigned/Card";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

interface IArticleListItemSkeletonProps {
    viewMode: ArticleViewMode;
}

const ArticleItemSkeletonDeprecated = ({ viewMode }: IArticleListItemSkeletonProps) => {
    const isGrid = viewMode === "grid";

    return (
        <div className={classNames(classes.ArticleListItem, {}, [classes[viewMode]])}>
            <CardDeprecated className={classes.card}>
                {isGrid ? (
                    <>
                        <div className={classes.imageWrapper}>
                            <SkeletonDeprecated className={classes.img} height={200} width={200} />
                        </div>
                        <div className={classes.infoWrapper}>
                            <SkeletonDeprecated height={16} width={130} />
                        </div>
                        <SkeletonDeprecated className={classes.title} height={16} width={150} />
                    </>
                ) : (
                    <>
                        <div className={classes.header}>
                            <SkeletonDeprecated borderRadius="50%" height={30} width={30} />
                            <SkeletonDeprecated className={classes.username} height={16} width={150} />
                            <SkeletonDeprecated className={classes.date} height={16} width={150} />
                        </div>
                        <SkeletonDeprecated className={classes.title} height={24} width={250} />
                        <SkeletonDeprecated className={classes.img} height={250} width="100%" />
                        <div className={classes.footer}>
                            <SkeletonDeprecated height={36} width={200} />
                        </div>
                    </>
                )}
            </CardDeprecated>
        </div>
    );
};

const ArticleItemSkeletonRedesigned = ({ viewMode }: IArticleListItemSkeletonProps) => {
    const isGrid = viewMode === "grid";
    const cardProps: Partial<ICardProps> = {
        border: isGrid ? "round" : undefined,
        padding: isGrid ? "0" : "8"
    };

    return (
        <div className={classNames(classes.ArticleListItemRedesigned, {}, [classes[viewMode]])}>
            <Card {...cardProps} className={classes.card}>
                {isGrid ? (
                    <VStack className={classes.gridSkeletonContainer} justify="between">
                        <VStack gap="16">
                            <Skeleton className={classes.img} height={140} width={240} />
                            <Skeleton height={24} width={130} />
                        </VStack>

                        <VStack className={classes.gridBottomSkeletonBlock} gap="4" maxWidth>
                            <HStack justify="between" maxWidth>
                                <Skeleton height={24} width={84} />
                                <Skeleton height={24} width={56} />
                            </HStack>
                            <Skeleton height={24} width={100} />
                        </VStack>
                    </VStack>
                ) : (
                    <>
                        <div className={classes.header}>
                            <Skeleton borderRadius="50%" height={30} width={30} />
                            <Skeleton className={classes.username} height={16} width={150} />
                            <Skeleton className={classes.date} height={16} width={150} />
                        </div>
                        <Skeleton className={classes.title} height={24} width={250} />
                        <Skeleton className={classes.img} height={250} width="100%" />
                        <div className={classes.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export const ArticleListItemSkeleton = memo(({ viewMode }: IArticleListItemSkeletonProps) => {
    // const CardComponent = useMemo(() => {
    //     return toggleFeatures({ name: "isAppRedesigned", off: () => CardDeprecated, on: () => Card });
    // }, []);

    // const SkeletonComponent = useMemo(() => {
    //     return toggleFeatures({ name: "isAppRedesigned", off: () => SkeletonDeprecated, on: () => Skeleton });
    // }, []);

    // const mainClassName = toggleFeatures({
    //     name: "isAppRedesigned",
    //     off: () => classes.ArticleListItem,
    //     on: () => classes.ArticleListItemRedesigned
    // });

    // const gridSkeleton = (
    //     <ToggleFeatures
    //         feature="isAppRedesigned"
    //         off={
    //             <>
    //                 <div className={classes.imageWrapper}>
    //                     <SkeletonComponent className={classes.img} height={200} width={200} />
    //                 </div>
    //                 <div className={classes.infoWrapper}>
    //                     <SkeletonComponent height={16} width={130} />
    //                 </div>
    //                 <SkeletonComponent className={classes.title} height={16} width={150} />
    //             </>
    //         }
    //         on={
    //             <VStack className={classes.gridSkeletonContainer} justify="between">
    //                 <VStack gap="16">
    //                     <SkeletonComponent className={classes.img} height={140} width={240} />
    //                     <SkeletonComponent height={24} width={130} />
    //                 </VStack>

    //                 <VStack className={classes.gridBottomSkeletonBlock} gap="4" maxWidth>
    //                     <HStack justify="between" maxWidth>
    //                         <SkeletonComponent height={24} width={84} />
    //                         <SkeletonComponent height={24} width={56} />
    //                     </HStack>
    //                     <SkeletonComponent height={24} width={100} />
    //                 </VStack>
    //             </VStack>
    //         }
    //     />
    // );

    // const cardProps = useMemo(() => {
    //     return toggleFeatures({
    //         name: "isAppRedesigned",
    //         off: () => ({}),
    //         on: () => ({
    //             border: isGrid ? "round" : undefined,
    //             padding: isGrid ? "0" : "8"
    //         })
    //     });
    // }, [isGrid]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<ArticleItemSkeletonDeprecated viewMode={viewMode} />}
            on={<ArticleItemSkeletonRedesigned viewMode={viewMode} />}
        />
        // <div className={classNames(mainClassName, {}, [classes[viewMode]])}>
        //     <CardComponent {...cardProps} className={classes.card}>
        //         {isGrid ? (
        //             gridSkeleton
        //         ) : (
        //             <>
        //                 <div className={classes.header}>
        //                     <SkeletonComponent borderRadius="50%" height={30} width={30} />
        //                     <SkeletonComponent className={classes.username} height={16} width={150} />
        //                     <SkeletonComponent className={classes.date} height={16} width={150} />
        //                 </div>
        //                 <SkeletonComponent className={classes.title} height={24} width={250} />
        //                 <SkeletonComponent className={classes.img} height={250} width="100%" />
        //                 <div className={classes.footer}>
        //                     <SkeletonComponent height={36} width={200} />
        //                 </div>
        //             </>
        //         )}
        //     </CardComponent>
        // </div>
    );
});
