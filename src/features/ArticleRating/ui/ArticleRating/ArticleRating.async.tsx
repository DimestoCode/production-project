import { lazy, Suspense } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { IArticleRatingProps } from "./ArticleRating";

const ArticleRatingLazy = lazy(() => import("./ArticleRating"));

export const ArticleRatingAsync = (props: IArticleRatingProps) => {
    return (
        <Suspense fallback={<Skeleton height={120} width="100%" />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
