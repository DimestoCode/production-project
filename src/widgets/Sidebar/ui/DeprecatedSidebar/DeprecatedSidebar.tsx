import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ISidebarProps } from "../../model/types/ISidebarProps";
import classes from "./DeprecatedSidebar.module.scss";

export const DeprecateSidebar = ({ children, collapsed, onToggle, className }: ISidebarProps) => {
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
                {children}
            </VStack>

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} short={collapsed} />
            </div>
        </aside>
    );
};
