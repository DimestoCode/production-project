import { classNames } from "shared/lib/classNames/classNames";

import classes from "./Navbar.module.scss";

interface NavBarProps {
    className?: string;
}

export const Navbar = ({ className }: NavBarProps) => (
    <nav className={classNames(classes.Navbar, {}, [className])}>
        <div className={classes.links}>\\</div>
    </nav>
);
