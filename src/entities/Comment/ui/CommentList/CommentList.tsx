import { memo } from "react";
import { useTranslation } from "react-i18next";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { IComment } from "../../model/types/IComment";
import { CommentCard } from "../CommentCard/CommentCard";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface ICommentListProps {
    className?: string;
    comments?: IComment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: ICommentListProps) => {
    const { t } = useTranslation("common");

    if (isLoading) {
        return (
            <VStack className={className} gap="16" maxWidth>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack className={className} gap="16" maxWidth>
            {comments?.length ? (
                comments.map((comment) => <CommentCard comment={comment} isLoading={isLoading} key={comment.id} />)
            ) : (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={<TextDeprecated text={t("There's no comments yet")} />}
                    on={<Text text={t("There's no comments yet")} />}
                />
            )}
        </VStack>
    );
});
