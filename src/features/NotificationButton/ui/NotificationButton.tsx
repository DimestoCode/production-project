import { NotificationList } from "entities/Notification";
import { memo } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import BellIcon from "shared/assets/icons/bell.svg";
import { Popover } from "shared/ui/Popups";
import classes from "./NotificationButton.module.scss";

export const NotificationButton = memo(() => {
    return (
        <Popover
            direction="bottom-left"
            triggerEl={
                <Button theme={ButtonTheme.Clear}>
                    <Icon Svg={BellIcon} inverted />
                </Button>
            }
        >
            <NotificationList className={classes.notifications} />
        </Popover>
    );
});
