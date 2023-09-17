import { ReactElement } from "react";
import { IFeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from "../../lib/setGetFeatures";

interface IToggleFeaturesProps {
    feature: keyof IFeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures = ({ feature, off, on }: IToggleFeaturesProps) => {
    if (getFeatureFlag(feature)) {
        return on;
    }

    return off;
};
