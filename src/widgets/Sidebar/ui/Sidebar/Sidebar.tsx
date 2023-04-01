import { memo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "widgets/LangSwitcher/ui/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { sidebarItemsList } from "widgets/Sidebar/model/sidebarItems";
import classes from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface ISideBarProps {
    className?: string;
}

export const Sidebar = memo(({ className = "" }: ISideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const onToggle = () => setCollapsed((prev) => !prev);

    return (
        <aside
            className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])}
            data-testid="sidebar"
        >
            <Button
                className={classes.collapseBtn}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                size={ButtonSize.L}
                theme={ButtonTheme.BackgroundInverted}
                type="button"
                square
            >
                <span className={classNames(classes.arrow, { [classes.arrowCollapsed]: collapsed })}>{"<"}</span>
            </Button>
            <div className={classes.items}>
                {sidebarItemsList.map((item) => (
                    <SidebarItem collapsed={collapsed} item={item} key={item.path} />
                ))}
            </div>

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} short={collapsed} />
            </div>
        </aside>
    );
});
