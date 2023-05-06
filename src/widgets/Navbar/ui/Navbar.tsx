import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/UserAuthentication";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Menu } from "shared/ui/Menu/Menu";
import { Text, TextTheme } from "shared/ui/Text/Text";

import classes from "./Navbar.module.scss";

interface INavBarProps {
    className?: string;
}

export const Navbar = memo(({ className = "" }: INavBarProps) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const authData = useSelector(getUserAuthData);

    const toggleModal = useCallback(() => {
        setIsLoginModalOpen((isOpen) => !isOpen);
    }, []);

    const onLogoutClick = useCallback(() => {
        dispatch(userActions.logout());
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    }, [dispatch]);

    const menuItems = useMemo(() => {
        return [
            { label: t("Profile"), href: `${RoutePath.profile}/${authData?.id}` },
            { label: t("Logout"), onClick: onLogoutClick }
        ];
    }, [authData?.id, onLogoutClick, t]);

    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
            <Text className={classes.appName} theme={TextTheme.Inverted} title={t("Dmytro's Blog")} />
            <AppLink className={classes.addBtn} theme={AppLinkTheme.Secondary} to={RoutePath.add_article}>
                {t("Add article")}
            </AppLink>
            {authData ? (
                <Menu
                    className={classes.userMenu}
                    direction="bottom-left"
                    items={menuItems}
                    triggerEl={<Avatar size={30} src={authData.avatar} />}
                />
            ) : (
                <Button className={classes.links} onClick={toggleModal} theme={ButtonTheme.ClearInverted}>
                    {t("Login")}
                </Button>
            )}

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleModal} />}
        </header>
    );
});
