import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isRoleAdmin, isRoleManager, useUserActions, useUserAuthData } from "@/entities/User";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { getRouteAdmin, getRouteProfile, getRouteSettings } from "@/shared/const/router";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Menu as MenuDeprecated } from "@/shared/ui/deprecated/Popups";
import { ToggleFeatures } from "@/shared/lib/features";
import { Menu } from "@/shared/ui/redesigned/Popups";
import { Avatar } from "@/shared/ui/redesigned/Avatar";

export const UserMenu = memo(() => {
    const { t } = useTranslation("common");
    const authData = useUserAuthData();
    const isAdmin = useSelector(isRoleAdmin);
    const isManager = useSelector(isRoleManager);
    const { logout } = useUserActions();
    const showAdminPanelItem = isAdmin || isManager;

    const onLogoutClick = useCallback(() => {
        logout();
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    }, [logout]);

    const menuItems = useMemo(() => {
        return [
            ...(showAdminPanelItem ? [{ label: t("Admin Panel"), href: getRouteAdmin() }] : []),
            { label: t("Settings"), href: getRouteSettings() },
            { label: t("Profile"), href: getRouteProfile(`${authData?.id}`) },
            { label: t("Logout"), onClick: onLogoutClick }
        ];
    }, [authData?.id, onLogoutClick, showAdminPanelItem, t]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <MenuDeprecated
                    direction="bottom-left"
                    items={menuItems}
                    triggerEl={<AvatarDeprecated size={30} src={authData?.avatar} />}
                />
            }
            on={
                <Menu
                    direction="bottom-left"
                    items={menuItems}
                    triggerEl={<Avatar size={40} src={authData?.avatar} />}
                />
            }
        />
    );
});
