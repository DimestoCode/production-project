import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";
import { IUser, IUserState } from "../types/IUser";

const initialState: IUserState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
        },
        retrieveAuthDataFromStorage: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
        }
    }
});

export const { actions: userActions, reducer: userReducer } = userSlice;
