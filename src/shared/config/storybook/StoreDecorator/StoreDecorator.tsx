import { DeepPartial } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";

export const StoreDecorator = (initialState: DeepPartial<IStoreState>) => (StoryComponent: Story) =>
    (
        <StoreProvider initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
