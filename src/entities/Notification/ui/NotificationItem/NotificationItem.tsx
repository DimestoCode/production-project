import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Card as CardDeprecated, CardTheme } from "@/shared/ui/deprecated/Card";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { INotification } from "../../model/types/INotification";
import classes from "./NotificationItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

interface INotificationItemProps {
    className?: string;
    notification: INotification;
}

export const NotificationItem = memo(({ className, notification }: INotificationItemProps) => {
    const content = useMemo(() => {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <CardDeprecated
                        className={classNames(classes.NotificationItem, {}, [className])}
                        theme={CardTheme.Outlined}
                    >
                        <TextDeprecated text={notification.description} title={notification.title} />
                    </CardDeprecated>
                }
                on={
                    <Card className={classNames(classes.NotificationItem, {}, [className])} variant="outlined">
                        <Text text={notification.description} title={notification.title} />
                    </Card>
                }
            />
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
