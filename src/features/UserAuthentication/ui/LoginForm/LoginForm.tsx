import isNil from "lodash/isNil";
import isString from "lodash/isString";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { TextTheme, Text } from "@/shared/ui/Text/Text";
import { loginActions, loginReducer } from "../../model/slices/loginSlice";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import classes from "./LoginForm.module.scss";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const dynamicModuleLoaderProps: IDynamicLoaderProps = {
    reducers: {
        loginForm: loginReducer
    },
    removeOnUnmount: true
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const navigate = useNavigate();
    useDynamicModuleLoader(dynamicModuleLoaderProps);

    const { t } = useTranslation("common");
    const dispatch = useAppDispatch();

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

    const isUser = (user: string | IUser | undefined): user is IUser => {
        return !!user && !isString(user) && !isNil(user.id);
    };

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled" && isUser(result.payload)) {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(result.payload));
            onSuccess();
            navigate(`${RoutePath.profile}/${result.payload.id}`);
        }
    }, [dispatch, navigate, onSuccess, password, username]);

    return (
        <form className={classNames(classes.LoginForm, {}, [className])}>
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
        </form>
    );
});

export default LoginForm;
