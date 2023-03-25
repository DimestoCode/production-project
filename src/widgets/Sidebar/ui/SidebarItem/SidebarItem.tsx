import { getUserAuthData } from "entities/User";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ISidebarItem } from "widgets/Sidebar/model/types/ISidebarItem";
import classes from "./SidebarItem.module.scss";

export const SidebarItem = memo(({ item, collapsed }: { item: ISidebarItem; collapsed: boolean }) => {
    const { path, text, Icon, isPrivate } = item;
    const { t } = useTranslation("common");

    const isAuthenticated = useSelector(getUserAuthData);

    if (!isAuthenticated && isPrivate) {
        return null;
    }

    return (
        <AppLink
            className={classNames(classes.item, { [classes.collapsed]: collapsed })}
            theme={AppLinkTheme.Secondary}
            to={path}
        >
            <Icon className={classes.icon} />
            <span className={classes.link}>{t(text)}</span>
        </AppLink>
    );
});
