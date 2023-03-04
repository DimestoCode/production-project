/* eslint-disable i18next/no-literal-string */
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Modal } from "shared/ui/Modal/Modal";

import classes from "./Navbar.module.scss";

interface NavBarProps {
    className?: string;
}

export const Navbar = ({ className }: NavBarProps) => {
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
                <Modal isOpen={isAuthWindowOpen} onClose={onToggleModal}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto obcaecati cumque praesentium
                    vitae, magni esse quidem, assumenda ipsam culpa alias, labore tempora! Placeat quibusdam corrupti
                    rem nesciunt doloribus? Excepturi, quod!
                </Modal>
            </div>
        </nav>
    );
};
