import { useTranslation } from "react-i18next";
import { NotificationButton } from "@/features/NotificationButton";
import { LoginModal } from "@/features/UserAuthentication";
import { UserMenu } from "@/features/UserMenu";
import { getRouteArticleAdd } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/deprecated/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/deprecated/Stack";
import { TextTheme, Text } from "@/shared/ui/deprecated/Text";
import classes from "./DeprecatedNavbar.module.scss";
import { INavbarProps } from "../../model/types/INavbarProps";

export const DeprecatedNavbar = ({ authData, isLoginModalOpen, toggleModal, className }: INavbarProps) => {
    const { t } = useTranslation("common");
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
};
