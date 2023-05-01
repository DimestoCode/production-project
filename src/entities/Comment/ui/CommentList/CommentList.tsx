import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import { IComment } from "../../model/types/IComment";
import { CommentCard } from "../CommentCard/CommentCard";
import classes from "./CommentList.module.scss";

interface ICommentListProps {
    className?: string;
    comments?: IComment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: ICommentListProps) => {
    const { t } = useTranslation("common");

    if (isLoading) {
        return (
            <div className={classNames(classes.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(classes.CommentList, {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard className={classes.comment} comment={comment} isLoading={isLoading} key={comment.id} />
                ))
            ) : (
                <Text text={t("There's no comments yet")} />
            )}
        </div>
    );
});
