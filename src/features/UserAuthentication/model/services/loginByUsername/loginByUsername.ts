import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, userActions } from "entities/User";
import i18n from "shared/config/i18n/i18n";

interface ILoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, { rejectValue: string }>(
    "login/loginByUsername",
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<IUser>("http://localhost:8000/login", authData);
            if (!response.data) {
                throw new Error();
            }

            thunkApi.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(
                i18n.t("Incorrect login or password", {
                    ns: "common"
                })
            );
        }
    }
);
