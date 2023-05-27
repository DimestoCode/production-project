import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getUserAuthData, isRoleAdmin, isRoleManager, userActions } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Menu } from "@/shared/ui/Popups";

export const UserMenu = memo(() => {
    const { t } = useTranslation("common");
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isRoleAdmin);
    const isManager = useSelector(isRoleManager);

    const showAdminPanelItem = isAdmin || isManager;

    const dispatch = useDispatch();

    const onLogoutClick = useCallback(() => {
        dispatch(userActions.logout());
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    }, [dispatch]);

    const menuItems = useMemo(() => {
        return [
            ...(showAdminPanelItem ? [{ label: t("Admin Panel"), href: RoutePath.admin_panel }] : []),
            { label: t("Profile"), href: `${RoutePath.profile}/${authData?.id}` },
            { label: t("Logout"), onClick: onLogoutClick }
        ];
    }, [authData?.id, onLogoutClick, showAdminPanelItem, t]);

    return <Menu direction="bottom-left" items={menuItems} triggerEl={<Avatar size={30} src={authData?.avatar} />} />;
});
