import { memo, useMemo } from "react";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { toggleFeatures } from "@/shared/lib/features";

interface INotificationListProps {
    className?: string;
}

export const NotificationList = memo(({ className }: INotificationListProps) => {
    const { data: notifications, isLoading } = useNotifications(undefined, {
        pollingInterval: 10000
    });

    const Skeleton = useMemo(
        () =>
            toggleFeatures({
                name: "isAppRedesigned",
                on: () => SkeletonRedesigned,
                off: () => SkeletonDeprecated
            }),
        []
    );

    return (
        <VStack className={className} gap="16" maxWidth>
            {isLoading ? (
                <>
                    <Skeleton borderRadius="8px" height="80px" width="100%" />
                    <Skeleton borderRadius="8px" height="80px" width="100%" />
                    <Skeleton borderRadius="8px" height="80px" width="100%" />
                </>
            ) : (
                notifications?.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))
            )}
        </VStack>
    );
});
