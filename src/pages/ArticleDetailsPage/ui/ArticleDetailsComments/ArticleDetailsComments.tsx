import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CommentList } from "@/entities/Comment";
import { AddCommentForm } from "@/features/AddCommentForm";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { retrieveCommentsByArticleId } from "../../model/services/retrieveCommentsByArticleId/retrieveCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleCommentsSlice/articleCommentsSlice";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useArticleCommentsIsLoading } from "../../model/selectors/comments/commentsSelectors";
import { toggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface IArticleDetailsCommentsProps {
    articleId: number;
}

export const ArticleDetailsComments = memo(({ articleId }: IArticleDetailsCommentsProps) => {
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useArticleCommentsIsLoading();

    const onCommentSubmit = useCallback(
        (comment: string) => {
            dispatch(addCommentForArticle(comment));
        },
        [dispatch]
    );

    useActionEffect(useCallback(() => retrieveCommentsByArticleId(Number(articleId)), [articleId]));

    const TextComponent = useMemo(() => {
        return toggleFeatures({ name: "isAppRedesigned", on: () => Text, off: () => TextDeprecated });
    }, []);
    return (
        <VStack gap="16" maxWidth>
            <TextComponent title={t("Comments")} />
            <AddCommentForm onCommentSubmit={onCommentSubmit} />
            <CommentList comments={comments} isLoading={isLoading} />
        </VStack>
    );
});
