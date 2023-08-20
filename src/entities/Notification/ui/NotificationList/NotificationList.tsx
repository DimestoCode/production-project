import { memo } from "react";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface INotificationListProps {
    className?: string;
}

export const NotificationList = memo(({ className }: INotificationListProps) => {
    const { data: notifications, isLoading } = useNotifications(undefined, {
        pollingInterval: 10000
    });
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
