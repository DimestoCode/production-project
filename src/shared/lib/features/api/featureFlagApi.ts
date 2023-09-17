import { rtkApi } from "@/shared/api/rtkApi";
import { IFeatureFlags } from "@/shared/types/featureFlags";

interface IUpdateFeatureFlagsParams {
    userId: number;
    features: Partial<IFeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, IUpdateFeatureFlagsParams>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                body: {
                    features
                }
            })
        })
    })
});

export const updateFeatureFlags = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
