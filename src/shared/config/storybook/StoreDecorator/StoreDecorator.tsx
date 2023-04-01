import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/UserAuthentication/model/slices/loginSlice";
import { Reducers } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

const defaultAsyncReducers: DeepPartial<Reducers> = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer
};

export function StoreDecorator(initialState: DeepPartial<IStoreState>, asyncReducers?: DeepPartial<Reducers>) {
    return (StoryComponent: Story) => (
        <StoreProvider asyncReducers={asyncReducers ?? defaultAsyncReducers} initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
}
