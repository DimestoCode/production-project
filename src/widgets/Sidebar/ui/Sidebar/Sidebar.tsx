import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "widgets/LangSwitcher/ui/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import MainPageIcon from "shared/assets/icons/main-page.svg";
import AboutPageIcon from "shared/assets/icons/about-page.svg";
import classes from "./Sidebar.module.scss";

interface ISideBarProps {
    className?: string;
}

export const Sidebar = ({ className = "" }: ISideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation("common");
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
                theme={ButtonTheme.BACKGROUND_INVERTED}
                type="button"
                square
            >
                {collapsed ? ">" : "<"}
            </Button>
            <div className={classes.items}>
                <AppLink className={classes.item} theme={AppLinkTheme.SECONDARY} to={RoutePath.main}>
                    <MainPageIcon className={classes.icon} />
                    <span className={classes.link}>{t("Main page")}</span>
                </AppLink>
                <AppLink className={classes.item} theme={AppLinkTheme.SECONDARY} to={RoutePath.about}>
                    <AboutPageIcon className={classes.icon} />
                    <span className={classes.link}>{t("About page")}</span>
                </AppLink>
            </div>

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} short={collapsed} />
            </div>
        </aside>
    );
};
