import { useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { LangSwitcher } from "widgets/LangSwitcher/ui/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import classes from "./Sidebar.module.scss";

interface SideBarProps {
    className?: string;
}

export const Sidebar = ({ className = "" }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation("common");
    const onToggle = () => setCollapsed((prev) => !prev);

    return (
        <div
            data-testid="sidebar"
            className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])}
        >
            <Button data-testid="sidebar-toggle" type="button" onClick={onToggle}>
                {t("Toggle")}
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} />
            </div>
        </div>
    );
};
