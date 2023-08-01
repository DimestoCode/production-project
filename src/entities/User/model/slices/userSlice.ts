import { PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { IUser, IUserState } from "../types/IUser";
import { buildSlice } from "@/shared/lib/store";
import { setFeatureFlags } from "@/shared/lib/features";
import { saveJsonSettings } from "../services/saveJsonSettings";

const initialState: IUserState = {
    _initialized: false
};

export const userSlice = buildSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
        },
        retrieveAuthDataFromStorage: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                const parsedUser: IUser = JSON.parse(user);
                state.authData = parsedUser;
                setFeatureFlags(parsedUser.features);
            }
            state._initialized = true;
        },
        logout: (state) => {
            state.authData = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveJsonSettings.fulfilled, (state, { payload }) => {
            if (state.authData) {
                state.authData.jsonSettings = payload;
            }
        });
    }
});

export const { actions: userActions, reducer: userReducer, useActions: useUserActions } = userSlice;
