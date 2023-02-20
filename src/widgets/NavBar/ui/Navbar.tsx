import { classNames } from "shared/lib/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";

import classes from "./Navbar.module.scss";

interface NavBarProps {
    className?: string;
}

export const Navbar = ({ className }: NavBarProps) => (
    <div className={classNames(classes.Navbar, {}, [className])}>
        <div className={classes.links}>
            <AppLink className={classes.mainLink} to="/" theme={AppLinkTheme.SECONDARY}>
                Main
            </AppLink>
            <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
                About
            </AppLink>
        </div>
    </div>
);
