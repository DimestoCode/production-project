import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../types/IUser";

const initialState: IUserState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
