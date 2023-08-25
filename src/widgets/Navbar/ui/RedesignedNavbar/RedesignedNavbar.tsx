import { useTranslation } from "react-i18next";
import { NotificationButton } from "@/features/NotificationButton";
import { LoginModal } from "@/features/UserAuthentication";
import { UserMenu } from "@/features/UserMenu";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { INavbarProps } from "../../model/types/INavbarProps";
import classes from "./RedesignedNavbar.module.scss";

export const RedesignedNavbar = ({ authData, isLoginModalOpen, toggleModal, className }: INavbarProps) => {
    const { t } = useTranslation("common");
    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
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
