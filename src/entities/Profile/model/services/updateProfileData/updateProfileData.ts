import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { IProfile, ProfileValidationError } from "../../types/IProfile";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<IProfile, void, IThunkConfig<ProfileValidationError[]>>(
    "profile/updateProfileData",
    async (_, { extra, rejectWithValue, getState }) => {
        const formData = getProfileForm(getState());
        const errors = validateProfileData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }
        try {
            const response = await extra.api.put<IProfile>(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([ProfileValidationError.ServerError]);
        }
    }
);
