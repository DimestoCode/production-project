import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieveProfileData } from "../services/retrieveProfileData/retrieveProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { IProfile, IProfileState } from "../types/IProfile";

const initialState: IProfileState = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: undefined
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(retrieveProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(retrieveProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
