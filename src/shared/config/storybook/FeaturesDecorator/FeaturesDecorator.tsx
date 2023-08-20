import { Story } from "@storybook/react";
import { setFeatureFlags } from "@/shared/lib/features";
import { IFeatureFlags } from "@/shared/types/featureFlags";

export const FeaturesDecorator = (featureFlags: DeepPartial<IFeatureFlags>) => {
    setFeatureFlags(featureFlags as IFeatureFlags);

    return (Story: Story) => <Story />;
};
