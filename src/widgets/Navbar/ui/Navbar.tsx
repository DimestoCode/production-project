import { getUserAuthData, userActions } from "entities/User";
import { LoginModal } from "features/UserAuthentication";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

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
        <nav className={classNames(classes.Navbar, {}, [className])}>
            <Button className={classes.links} onClick={onClickHandler} theme={ButtonTheme.CLEAR_INVERTED}>
                {t(btnText)}
            </Button>
            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleModal} />}
        </nav>
    );
});
