import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { IProfile } from "../../types/IProfile";

export const updateProfileData = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
    "profile/updateProfileData",
    async (_, { extra, rejectWithValue, getState }) => {
        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put<IProfile>("/profile", formData);
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
