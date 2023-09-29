import { useTranslation } from "react-i18next";
import { NotificationButton } from "@/features/NotificationButton";
import { LoginModal } from "@/features/UserAuthentication";
import { UserMenu } from "@/features/UserMenu";
import { classNames } from "@/shared/lib/classNames/classNames";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { INavbarProps } from "../../model/types/INavbarProps";
import classes from "./RedesignedNavbar.module.scss";
import { Button } from "@/shared/ui/redesigned/Button";

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
                <Button className={classes.links} onClick={toggleModal} variant="clear">
                    {t("Login")}
                </Button>
            )}

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleModal} />}
        </header>
    );
};
