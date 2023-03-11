/* eslint-disable i18next/no-literal-string */
import { LoginModal } from "features/AuthenticationByUserName";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Modal } from "shared/ui/Modal/Modal";

import classes from "./Navbar.module.scss";

interface INavBarProps {
    className?: string;
}

export const Navbar = ({ className = "" }: INavBarProps) => {
    const { t } = useTranslation("common");
    const [isAuthWindowOpen, setIsAuthWindowOpen] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthWindowOpen((isOpen) => !isOpen);
    }, []);

    return (
        <nav className={classNames(classes.Navbar, {}, [className])}>
            <div className={classes.links}>
                <Button className={classes.links} onClick={onToggleModal} theme={ButtonTheme.CLEAR_INVERTED}>
                    {t("Login")}
                </Button>
                <LoginModal isOpen={isAuthWindowOpen} onClose={onToggleModal} />
            </div>
        </nav>
    );
};
