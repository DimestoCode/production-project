import { Story } from "@storybook/react";
import { getAllFeatureFlags, setFeatureFlags } from "@/shared/lib/features";
import { IFeatureFlags } from "@/shared/types/featureFlags";

export const FeatureFlagsDecorator = (features: IFeatureFlags) => (StoryComp: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), ...features });
    return <StoryComp />;
};
