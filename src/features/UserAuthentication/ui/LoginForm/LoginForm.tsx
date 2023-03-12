import { getLoginState, loginActions, loginByUsername } from "features/UserAuthentication";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { TextTheme, Text } from "shared/ui/Text/Text";
import classes from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { username, password, isLoading, error } = useSelector(getLoginState);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(classes.LoginForm, {}, [className])}>
            <Text title={t("Login Form")} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
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
                theme={ButtonTheme.OUTLINE}
            >
                {t("Login")}
            </Button>
        </div>
    );
});
