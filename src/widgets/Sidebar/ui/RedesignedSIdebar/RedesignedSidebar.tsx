import { classNames } from "@/shared/lib/classNames/classNames";
import { ISidebarProps } from "../../model/types/ISidebarProps";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

import ArrowIcon from "@/shared/assets/icons/arrow-down.svg";

import classes from "./RedesignedSidebar.module.scss";

export const RedesignedSidebar = ({ children, collapsed, onToggle }: ISidebarProps) => {
    return (
        <aside
            className={classNames(classes.SidebarRedesigned, { [classes.collapsed]: collapsed })}
            data-testid="sidebar"
        >
            <AppLogo className={classes.logo} size={collapsed ? 30 : 50} />
            <VStack className={classes.items} gap="8" role="navigation" tag="nav">
                {children}
            </VStack>

            <Icon
                Svg={ArrowIcon}
                className={classNames(classes.collapseBtn, { [classes.collapsed]: collapsed })}
                data-testid="sidebar-toggle"
                height={15}
                onClick={onToggle}
                width={15}
                clickable
            />

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} short={collapsed} />
            </div>
        </aside>
    );
};
