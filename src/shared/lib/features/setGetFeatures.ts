import { IFeatureFlags } from "@/shared/types/featureFlags";

let featureFlags: IFeatureFlags;

export function setFeatureFlags(newFeatureFlags?: IFeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof IFeatureFlags) {
    return featureFlags[flag];
}
