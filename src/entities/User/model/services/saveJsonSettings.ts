import { createAsyncThunk } from "@reduxjs/toolkit";
import { IJSonSettings } from "../types/IJsonSettings";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { getJsonSettings } from "../selectors/jsonSettings";
import { userApi } from "../api/userApi";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;

export const saveJsonSettings = createAsyncThunk<IJSonSettings, IJSonSettings, IThunkConfig<string>>(
    "user/saveJsonSettings",
    async (newJsonSettings: IJSonSettings, { getState, rejectWithValue, dispatch }) => {
        const userData = getUserAuthData(getState());
        const currentSettings = getJsonSettings(getState());

        if (!userData) {
            return rejectWithValue("");
        }

        try {
            const response = await dispatch(
                setJsonSettingsMutation({
                    userId: userData.id,
                    jsonSettings: {
                        ...currentSettings,
                        ...newJsonSettings
                    }
                })
            ).unwrap();

            if (!response.jsonSettings) {
                return rejectWithValue("");
            }

            return response.jsonSettings;
        } catch (e) {
            console.log(e);
            return rejectWithValue("");
        }
    }
);
