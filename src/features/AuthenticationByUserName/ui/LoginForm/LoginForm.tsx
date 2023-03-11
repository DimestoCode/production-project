import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import classes from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation("common");
    return (
        <div className={classNames(classes.LoginForm, {}, [className])}>
            <Input autoFocus className={classes.input} placeholder={t("Input login")} type="text" />
            <Input className={classes.input} placeholder={t("Input password")} type="text" />
            <Button className={classes.loginBtn}>{t("Login")}</Button>
        </div>
    );
};
