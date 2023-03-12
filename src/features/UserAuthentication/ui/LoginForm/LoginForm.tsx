import { loginActions, loginByUsername } from "features/UserAuthentication";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { IDynamicLoaderProps, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { TextTheme, Text } from "shared/ui/Text/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginisLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginReducer } from "../../model/slices/loginSlice";
import classes from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
}

const dynamicModuleLoaderProps: IDynamicLoaderProps = {
    reducers: {
        loginForm: loginReducer
    },
    removeOnUnmount: true
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    useDynamicModuleLoader(dynamicModuleLoaderProps);

    const { t } = useTranslation("common");
    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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

export default LoginForm;
