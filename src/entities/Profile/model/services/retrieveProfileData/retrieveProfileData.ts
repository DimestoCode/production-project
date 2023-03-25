import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import { IProfile } from "../../types/IProfile";

export const retrieveProfileData = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
    "profile/retrieveProfileData",
    async (_, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<IProfile>("/profile");

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
