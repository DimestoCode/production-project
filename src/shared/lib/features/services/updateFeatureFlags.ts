import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { IFeatureFlags } from "@/shared/types/featureFlags";
import { updateFeatureFlags as updateFeatureFlagsMutation } from "../api/featureFlagApi";
import { getAllFeatureFlags } from "../lib/setGetFeatures";

interface IUpdateFeatureFlagOptions {
    userId: number;
    newFeatures: Partial<IFeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<void | string, IUpdateFeatureFlagOptions, IThunkConfig<string>>(
    "user/saveJsonSettigs",
    async ({ userId, newFeatures }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            await dispatch(
                updateFeatureFlagsMutation({
                    userId,
                    features: {
                        ...getAllFeatureFlags(),
                        ...newFeatures
                    }
                })
            );
            window.location.reload();

            return;
        } catch (e) {
            console.log(e);
            rejectWithValue("");
        }
    }
);
