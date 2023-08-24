import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink";
import { ISidebarItem } from "../../model/types/ISidebarItem";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon";
import classes from "./SidebarItem.module.scss";

export const SidebarItem = memo(({ item, collapsed }: { item: ISidebarItem; collapsed: boolean }) => {
    const { path, text, Icon: ItemIcon, isPrivate } = item;
    const { t } = useTranslation("common");

    const isAuthenticated = useUserAuthData();

    if (!isAuthenticated && isPrivate) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <AppLinkDeprecated
                    className={classNames(classes.item, { [classes.collapsed]: collapsed })}
                    to={path}
                    variant="secondary"
                >
                    <ItemIcon className={classes.icon} />
                    <span className={classes.link}>{t(text)}</span>
                </AppLinkDeprecated>
            }
            on={
                <AppLink
                    activeClassName={classes.active}
                    className={classNames(classes.itemRedesigned, { [classes.collapsed]: collapsed })}
                    to={path}
                    variant="secondary"
                >
                    <Icon Svg={ItemIcon} clickable={false} />
                    <span className={classes.link}>{t(text)}</span>
                </AppLink>
            }
        />
    );
});
