import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./RedesignedSidebar.module.scss";
import { ISidebarProps } from "../../model/types/ISidebarProps";
import { AppLogo } from "@/shared/ui/AppLogo";

export const RedesignedSidebar = ({ children, collapsed }: ISidebarProps) => {
    return (
        <aside
            className={classNames(classes.SidebarRedesigned, { [classes.collapsed]: collapsed })}
            data-testid="sidebar"
        >
            <AppLogo className={classes.logo} />
            {children}
        </aside>
    );
};
