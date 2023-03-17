import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/UserAuthentication/model/slices/loginSlice";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<IStoreState>> = {
    loginForm: loginReducer,
    profile: profileReducer
};

export function StoreDecorator(
    initialState: DeepPartial<IStoreState>,
    asyncReducers?: DeepPartial<ReducersMapObject<IStoreState>>
) {
    return (StoryComponent: Story) => (
        <StoreProvider asyncReducers={asyncReducers ?? defaultAsyncReducers} initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
}
