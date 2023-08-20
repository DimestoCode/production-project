import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RatingCard } from "@/entities/Rating";
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi";
import { useUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";

export interface IArticleRatingProps {
    className?: string;
    articleId: number;
}

const ArticleRating = memo(({ className, articleId }: IArticleRatingProps) => {
    const { t } = useTranslation("article");
    const authData = useUserAuthData();
    const userId = authData?.id ?? 0;
    const { data: articleRatingData, isLoading } = useGetArticleRating({ articleId, userId });
    const [rateArticleMutation] = useRateArticle();

    const articleRating = articleRatingData?.[0];

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({ articleId, userId, rate: starsCount, feedback });
            } catch (error) {
                console.log(error);
            }
        },
        [articleId, rateArticleMutation, userId]
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle]
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle]
    );

    if (isLoading) {
        return <Skeleton height={120} width="100%" />;
    }

    return (
        <RatingCard
            className={className}
            feedbackTitle={t("Leave your feedback")}
            onAccept={onAccept}
            onCancel={onCancel}
            rate={articleRating?.rate}
            title={t("Rate the article")}
            withFeedback
        />
    );
});

export default ArticleRating;
