import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Card, CardTheme } from "@/shared/ui/deprecated/Card";
import { Text } from "@/shared/ui/deprecated/Text";
import { INotification } from "../../model/types/INotification";
import classes from "./NotificationItem.module.scss";

interface INotificationItemProps {
    className?: string;
    notification: INotification;
}

export const NotificationItem = memo(({ className, notification }: INotificationItemProps) => {
    const content = useMemo(() => {
        return (
            <Card className={classNames(classes.NotificationItem, {}, [className])} theme={CardTheme.Outlined}>
                <Text text={notification.description} title={notification.title} />
            </Card>
        );
    }, [className, notification.description, notification.title]);

    return notification.href ? (
        <AppLink className={classes.link} target="_blank" to={notification.href}>
            {content}
        </AppLink>
    ) : (
        content
    );
});
