import { LOCAL_STORAGE_DESIGN_KEY } from "@/shared/const/localStorage";
import { IFeatureFlags } from "@/shared/types/featureFlags";

let featureFlags: IFeatureFlags = {
    isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_DESIGN_KEY) === "new"
};

export function setFeatureFlags(newFeatureFlags?: IFeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }

    localStorage.setItem(LOCAL_STORAGE_DESIGN_KEY, newFeatureFlags?.isAppRedesigned ? "new" : "old");
}

export function getFeatureFlag(flag: keyof IFeatureFlags) {
    return featureFlags?.[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}
