import { IFeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from "./setGetFeatures";

export interface IToggleFeaturesOptions<T> {
    name: keyof IFeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({ off, on, name }: IToggleFeaturesOptions<T>) {
    if (getFeatureFlag(name)) {
        return on();
    }

    return off();
}
