import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isRoleAdmin, isRoleManager, useUserActions, useUserAuthData } from "@/entities/User";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { getRouteAdmin, getRouteProfile } from "@/shared/const/router";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Menu } from "@/shared/ui/deprecated/Popups";

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
            { label: t("Profile"), href: getRouteProfile(`${authData?.id}`) },
            { label: t("Logout"), onClick: onLogoutClick }
        ];
    }, [authData?.id, onLogoutClick, showAdminPanelItem, t]);

    return <Menu direction="bottom-left" items={menuItems} triggerEl={<Avatar size={30} src={authData?.avatar} />} />;
});
