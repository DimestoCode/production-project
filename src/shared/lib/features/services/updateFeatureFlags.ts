import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { IFeatureFlags } from "@/shared/types/featureFlags";
import { updateFeatureFlags as updateFeatureFlagsMutation } from "../api/featureFlagApi";
import { getAllFeatureFlags, setFeatureFlags } from "../lib/setGetFeatures";

interface IUpdateFeatureFlagOptions {
    userId: number;
    newFeatures: Partial<IFeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<void | string, IUpdateFeatureFlagOptions, IThunkConfig<string>>(
    "user/saveJsonSettigs",
    async ({ userId, newFeatures }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        const newFeatureFalgs = {
            ...getAllFeatureFlags(),
            ...newFeatures
        };
        try {
            await dispatch(
                updateFeatureFlagsMutation({
                    userId,
                    features: newFeatureFalgs
                })
            );

            setFeatureFlags(newFeatureFalgs);
            return;
        } catch (e) {
            console.log(e);
            rejectWithValue("");
        }
    }
);
