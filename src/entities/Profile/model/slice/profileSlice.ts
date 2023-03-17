import { createSlice } from "@reduxjs/toolkit";
import { IProfileState } from "../types/IProfile";

const initialState: IProfileState = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {}
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
