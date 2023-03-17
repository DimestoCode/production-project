import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ISidebarItem } from "widgets/Sidebar/model/types/ISidebarItem";
import classes from "./SidebarItem.module.scss";

export const SidebarItem = memo(({ item, collapsed }: { item: ISidebarItem; collapsed: boolean }) => {
    const { path, text, Icon } = item;
    const { t } = useTranslation("common");
    return (
        <AppLink
            className={classNames(classes.item, { [classes.collapsed]: collapsed })}
            theme={AppLinkTheme.SECONDARY}
            to={path}
        >
            <Icon className={classes.icon} />
            <span className={classes.link}>{t(text)}</span>
        </AppLink>
    );
});
