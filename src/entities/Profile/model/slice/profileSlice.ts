import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieveProfileData } from "../services/retrieveProfileData/retrieveProfileData";
import { IProfile, IProfileState } from "../types/IProfile";

const initialState: IProfileState = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(retrieveProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(retrieveProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
