import { useTranslation } from "react-i18next";
import { ILoginProps } from "../../model/types/ILogin";
import classes from "./LoginForm.module.scss";
import { Input } from "@/shared/ui/redesigned/Input";
import { Text } from "@/shared/ui/redesigned/Text";
import { Button } from "@/shared/ui/redesigned/Button";

export const LoginFormRedesigned = ({
    error,
    username,
    onChangeUsername,
    onChangePassword,
    isLoading,
    password,
    onLoginClick
}: ILoginProps) => {
    const { t } = useTranslation("common");

    return (
        <>
            <Text title={t("Login Form")} />
            {error && <Text text={error} variant="error" />}
            <Input
                className={classes.input}
                onChange={onChangeUsername}
                placeholder={t("Input login")}
                type="text"
                value={username}
                autoFocus
            />
            <Input
                className={classes.input}
                onChange={onChangePassword}
                placeholder={t("Input password")}
                type="text"
                value={password}
            />
            <Button
                className={classes.loginBtn}
                disabled={isLoading}
                onClick={onLoginClick}
                type="submit"
                variant="outlined"
            >
                {t("Login")}
            </Button>
        </>
    );
};
