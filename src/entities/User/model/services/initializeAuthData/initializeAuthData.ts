import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { IUser } from "../../types/IUser";
import i18n from "@/shared/config/i18n/i18n";

export const initializeAuthData = createAsyncThunk<IUser, void, IThunkConfig<string>>(
    "user/initializeAuthData",
    async (_, { rejectWithValue, extra }) => {
        const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

        if (!userId) {
            return rejectWithValue("");
        }

        try {
            const response = await extra.api.get<IUser>(`users/${userId}`);

            if (!response.data.jsonSettings) {
                return rejectWithValue(
                    i18n.t("Settings are missed", {
                        ns: "common"
                    })
                );
            }

            return response.data;
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
