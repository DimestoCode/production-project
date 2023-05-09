import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import { IProfile } from "../../types/IProfileState";

export const retrieveProfileData = createAsyncThunk<IProfile, number, IThunkConfig<string>>(
    "profile/retrieveProfileData",
    async (profileId: number, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<IProfile>(`/profile/${profileId}`);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue(
                i18n.t("Server Error", {
                    ns: "profile"
                })
            );
        }
    }
);
