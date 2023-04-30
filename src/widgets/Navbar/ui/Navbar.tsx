import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/UserAuthentication";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
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

    const onClickHandler = authData ? onLogoutClick : toggleModal;
    const btnText = authData ? "Logout" : "Login";

    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
            <Text className={classes.appName} theme={TextTheme.Inverted} title={t("Dmytro's Blog")} />
            <AppLink className={classes.addBtn} theme={AppLinkTheme.Secondary} to={RoutePath.add_article}>
                {t("Add article")}
            </AppLink>

            <Button className={classes.links} onClick={onClickHandler} theme={ButtonTheme.ClearInverted}>
                {t(btnText)}
            </Button>
            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleModal} />}
        </header>
    );
});
