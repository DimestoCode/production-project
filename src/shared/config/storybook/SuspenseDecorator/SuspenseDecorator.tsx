import { Story } from "@storybook/react";
import { Suspense } from "react";

export function SuspenseDecorator(StoryComponent: Story) {
    return (
        <Suspense>
            <StoryComponent />
        </Suspense>
    );
}
