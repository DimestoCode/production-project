import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { VStack } from "@/shared/ui/Stack";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import classes from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface ISideBarProps {
    className?: string;
}

export const Sidebar = memo(({ className = "" }: ISideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => setCollapsed((prev) => !prev);

    const renderedSidebarItems = useMemo(
        () => sidebarItemsList.map((item) => <SidebarItem collapsed={collapsed} item={item} key={item.path} />),
        [collapsed, sidebarItemsList]
    );

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
            <VStack className={classes.items} gap="8" tag="nav">
                {renderedSidebarItems}
            </VStack>

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} short={collapsed} />
            </div>
        </aside>
    );
});
