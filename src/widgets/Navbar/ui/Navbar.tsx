import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";

import classes from "./Navbar.module.scss";

interface NavBarProps {
    className?: string;
}

export const Navbar = ({ className }: NavBarProps) => {
    const { t } = useTranslation("common");
    return (
        <nav className={classNames(classes.Navbar, {}, [className])}>
            <div className={classes.links}>/</div>
        </nav>
    );
};
