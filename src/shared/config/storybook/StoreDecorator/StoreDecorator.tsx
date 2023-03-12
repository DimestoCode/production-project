import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { loginReducer } from "features/UserAuthentication/model/slices/loginSlice";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<IStoreState>> = {
    loginForm: loginReducer
};

export const StoreDecorator = (
    initialState: DeepPartial<IStoreState>,
    asyncReducers?: DeepPartial<ReducersMapObject<IStoreState>>
    // eslint-disable-next-line arrow-body-style
) => {
    return (StoryComponent: Story) => (
        <StoreProvider asyncReducers={asyncReducers ?? defaultAsyncReducers} initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
};
