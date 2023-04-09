import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { IUser, userActions } from "entities/User";
import i18n from "shared/config/i18n/i18n";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface ILoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, IThunkConfig<string>>(
    "login/loginByUsername",
    async (authData, { dispatch, extra, rejectWithValue }) => {
        try {
            const response = await extra.api.post<IUser>("/login", authData);
            if (!response.data) {
                throw new Error();
            }

            dispatch(userActions.setAuthData(response.data));
            extra.navigate?.(`${RoutePath.profile}/${response.data.id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(
                i18n.t("Incorrect login or password", {
                    ns: "common"
                })
            );
        }
    }
);
