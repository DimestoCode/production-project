import { useState } from "react";
import { classNames } from "shared/lib/classNames";
import { LangSwitcher } from "widgets/LangSwitcher/ui/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import classes from "./Sidebar.module.scss";

interface SideBarProps {
    className?: string;
}

export const Sidebar = ({ className = "" }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => setCollapsed((prev) => !prev);

    return (
        <div className={classNames(classes.sidebar, { [classes.collapsed]: collapsed }, [className])}>
            <button type="button" onClick={onToggle}>
                Toggle
            </button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} />
            </div>
        </div>
    );
};
