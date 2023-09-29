import { memo, useMemo } from "react";
import { getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { IComment } from "../../model/types/IComment";
import classes from "./CommentCard.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Card } from "@/shared/ui/redesigned/Card";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Text } from "@/shared/ui/redesigned/Text";
import { Avatar } from "@/shared/ui/redesigned/Avatar";

interface ICommentCardProps {
    className?: string;
    comment?: IComment;
    isLoading?: boolean;
}

export const CommentCardSkeleton = memo(() => {
    const SkeletonComponent = useMemo(() => {
        return toggleFeatures({ name: "isAppRedesigned", on: () => Skeleton, off: () => SkeletonDeprecated });
    }, []);

    return (
        <VStack
            className={classNames(classes.CommentCard, {}, [classes.loading])}
            data-testid="ContentCard.Loading"
            gap="16"
            maxWidth
        >
            <div className={classes.header}>
                <SkeletonComponent borderRadius="50%" height={30} width={30} />
                <SkeletonComponent className={classes.username} height={16} width={100} />
            </div>
            <SkeletonComponent className={classes.text} height={50} width="100%" />
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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <VStack
                    className={classNames(classes.CommentCard, {}, [className])}
                    data-testid="CommentCard.Content"
                    gap="8"
                    maxWidth
                >
                    <AppLinkDeprecated className={classes.header} to={getRouteProfile(String(comment.user.id))}>
                        {comment.user.avatar ? <AvatarDeprecated size={30} src={comment.user.avatar} /> : null}
                        <TextDeprecated className={classes.username} title={comment.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated className={classes.text} text={comment.text} />
                </VStack>
            }
            on={
                <Card border="round" padding="24" fullWidth>
                    <VStack
                        className={classNames(classes.CommentCardRedesigned, {}, [className])}
                        data-testid="CommentCard.Content"
                        gap="8"
                        maxWidth
                    >
                        <AppLink to={getRouteProfile(String(comment.user.id))}>
                            <HStack gap="8">
                                {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                                <Text className={classes.username} title={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
        />
    );
});
