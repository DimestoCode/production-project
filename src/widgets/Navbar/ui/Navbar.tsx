import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { NotificationButton } from "@/features/NotificationButton";
import { LoginModal } from "@/features/UserAuthentication";
import { UserMenu } from "@/features/UserMenu";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text";
import classes from "./Navbar.module.scss";
import { getRouteArticleAdd } from "@/shared/const/router";

interface INavBarProps {
    className?: string;
}

export const Navbar = memo(({ className = "" }: INavBarProps) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { t } = useTranslation("common");
    const authData = useSelector(getUserAuthData);

    const toggleModal = useCallback(() => {
        setIsLoginModalOpen((isOpen) => !isOpen);
    }, []);

    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
            <Text className={classes.appName} theme={TextTheme.Inverted} title={t("Dmytro's Blog")} />
            <AppLink className={classes.addBtn} theme={AppLinkTheme.Secondary} to={getRouteArticleAdd()}>
                {t("Add article")}
            </AppLink>
            {authData ? (
                <HStack align="center" className={classes.actions} gap="16">
                    <NotificationButton />
                    <UserMenu />
                </HStack>
            ) : (
                <Button className={classes.links} onClick={toggleModal} theme={ButtonTheme.ClearInverted}>
                    {t("Login")}
                </Button>
            )}

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleModal} />}
        </header>
    );
});
