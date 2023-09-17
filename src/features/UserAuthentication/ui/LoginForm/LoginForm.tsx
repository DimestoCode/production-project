import isNil from "lodash/isNil";
import isString from "lodash/isString";
import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/entities/User";
import { getRouteProfile } from "@/shared/const/router";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { loginReducer, useLoginActions } from "../../model/slices/loginSlice";
import { useLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { useLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { useLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { useLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import classes from "./LoginForm.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { LoginFormRedesigned } from "./LoginFormRedesigned";
import { LoginFormDeprecated } from "./LoginFormDeprecated";
import { ILoginProps } from "../../model/types/ILogin";

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

    const dispatch = useAppDispatch();
    const { setPassword, setUsername } = useLoginActions();

    const username = useLoginUsername();
    const password = useLoginPassword();
    const isLoading = useLoginIsLoading();
    const error = useLoginError();

    const onChangeUsername = useCallback(
        (value: string) => {
            setUsername(value);
        },
        [setUsername]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            setPassword(value);
        },
        [setPassword]
    );

    const isUser = (user: string | IUser | undefined): user is IUser => {
        return !!user && !isString(user) && !isNil(user.id);
    };

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled" && isUser(result.payload)) {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, String(result.payload.id));
            onSuccess();
            navigate(getRouteProfile(`${result.payload.id}`));
        }
    }, [dispatch, navigate, onSuccess, password, username]);

    const props = useMemo<ILoginProps>(
        () => ({
            isLoading,
            onChangePassword,
            onChangeUsername,
            onLoginClick,
            password,
            username,
            error
        }),
        [error, isLoading, onChangePassword, onChangeUsername, onLoginClick, password, username]
    );
    return (
        <form className={classNames(classes.LoginForm, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<LoginFormDeprecated {...props} />}
                on={<LoginFormRedesigned {...props} />}
            />
        </form>
    );
});

export default LoginForm;
