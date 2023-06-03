import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "@/app/providers/StoreProvider";
import { Reducers } from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { articlesReducer } from "@/pages/ArticlesPage/testing";
import { loginReducer } from "@/features/UserAuthentication/testing";
import { profileReducer } from "@/features/EditableProfileCard/testing";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/testing";
import { addCommentFormReducer } from "@/features/AddCommentForm/testing";

const defaultAsyncReducers: Reducers = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articles: articlesReducer
};

export function StoreDecorator(initialState: DeepPartial<IStoreState>, asyncReducers?: DeepPartial<Reducers>) {
    return (StoryComponent: Story) => (
        <StoreProvider asyncReducers={asyncReducers ?? defaultAsyncReducers} initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
}
