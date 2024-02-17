import { Story } from "@storybook/react";
import { getAllFeatureFlags, setFeatureFlags } from "@/shared/lib/features";

export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });

    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
