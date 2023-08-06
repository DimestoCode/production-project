import { createAsyncThunk } from "@reduxjs/toolkit";
import { IJsonSettings } from "../../types/IJsonSettings";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { getJsonSettings } from "../../selectors/jsonSettings";
import { getUserAuthData } from "../../selectors/getUserAuthData/getUserAuthData";
import i18n from "@/shared/config/i18n/i18n";
import { IUser } from "../../types/IUser";

export const saveJsonSettings = createAsyncThunk<IJsonSettings, IJsonSettings, IThunkConfig<string>>(
    "user/saveJsonSettings",
    async (newJsonSettings: IJsonSettings, { getState, rejectWithValue, extra }) => {
        const userData = getUserAuthData(getState());
        const currentSettings = getJsonSettings(getState());

        if (!userData) {
            return rejectWithValue(
                i18n.t("User is not authorized", {
                    ns: "common"
                })
            );
        }

        try {
            const response = await extra.api.patch<IUser>(`users/${userData.id}`, {
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings
                }
            });

            if (!response.data?.jsonSettings) {
                return rejectWithValue(
                    i18n.t("Settings are missed", {
                        ns: "common"
                    })
                );
            }

            return response.data.jsonSettings;
        } catch (e) {
            console.log(e);
            return rejectWithValue(
                i18n.t("Something went wrong", {
                    ns: "common"
                })
            );
        }
    }
);
