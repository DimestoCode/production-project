import { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../types/IUser";
import { buildSlice } from "@/shared/lib/store";
import { setFeatureFlags } from "@/shared/lib/features";
import { saveJsonSettings } from "../services/saveJsonSettings/saveJsonSettings";
import { initializeAuthData } from "../services/initializeAuthData/initializeAuthData";

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
        logout: (state) => {
            state.authData = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveJsonSettings.fulfilled, (state, { payload }) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            })
            .addCase(initializeAuthData.fulfilled, (state, { payload }) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._initialized = true;
            })
            .addCase(initializeAuthData.rejected, (state) => {
                state._initialized = true;
            });
    }
});

export const { actions: userActions, reducer: userReducer, useActions: useUserActions } = userSlice;
