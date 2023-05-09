import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice/articleDetailsSlice";
import { addCommentFormReducer } from "features/AddCommentForm/model/slices/addCommentFormSlice";
import { profileReducer } from "features/EditableProfileCard";
import { loginReducer } from "features/UserAuthentication/model/slices/loginSlice";
import { articleDetailsPageReducer } from "pages/ArticleDetailsPage/model/slices";
import { articlesReducer } from "pages/ArticlesPage/model/slices/articlesPageSlice";
import { Reducers } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

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
