import { useTranslation } from "react-i18next";
import { ILoginProps } from "../../model/types/ILogin";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Input } from "@/shared/ui/deprecated/Input";
import { TextTheme, Text } from "@/shared/ui/deprecated/Text";
import classes from "./LoginForm.module.scss";

export const LoginFormDeprecated = ({
    isLoading,
    onChangePassword,
    onChangeUsername,
    onLoginClick,
    password,
    username,
    error
}: ILoginProps) => {
    const { t } = useTranslation();
    return (
        <>
            <Text title={t("Login Form")} />
            {error && <Text text={error} theme={TextTheme.Error} />}
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
                theme={ButtonTheme.Outline}
                type="submit"
            >
                {t("Login")}
            </Button>
        </>
    );
};
