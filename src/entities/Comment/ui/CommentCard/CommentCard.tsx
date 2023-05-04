import { memo } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { IComment } from "../../model/types/IComment";
import classes from "./CommentCard.module.scss";

interface ICommentCardProps {
    className?: string;
    comment?: IComment;
    isLoading?: boolean;
}

export const CommentCardSkeleton = memo(() => {
    return (
        <VStack className={classNames(classes.CommentCard, {}, [classes.loading])} gap="16" maxWidth>
            <div className={classes.header}>
                <Skeleton borderRadius="50%" height={30} width={30} />
                <Skeleton className={classes.username} height={16} width={100} />
            </div>
            <Skeleton className={classes.text} height={50} width="100%" />
        </VStack>
    );
});

export const CommentCard = memo(({ className, comment, isLoading }: ICommentCardProps) => {
    if (isLoading) {
        return <CommentCardSkeleton />;
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack className={classNames(classes.CommentCard, {}, [className])} gap="8" maxWidth>
            <AppLink className={classes.header} to={`${RoutePath.profile}/${comment.user.id}`}>
                {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                <Text className={classes.username} title={comment.user.username} />
            </AppLink>
            <Text className={classes.text} text={comment.text} />
        </VStack>
    );
});
