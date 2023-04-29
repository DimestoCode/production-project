import { Story } from "@storybook/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice/articleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { addCommentFormReducer } from "features/AddCommentForm/model/slices/addCommentFormSlice";
import { loginReducer } from "features/UserAuthentication/model/slices/loginSlice";
import { articleCommentsReducer } from "pages/ArticleDetailsPage/model/slices/articleCommentsSlice";
import { articlesReducer } from "pages/ArticlesPage/model/slices/articlesPageSlice";
import { Reducers } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

const defaultAsyncReducers: DeepPartial<Reducers> = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleComments: articleCommentsReducer,
    articles: articlesReducer
};

export function StoreDecorator(initialState: DeepPartial<IStoreState>, asyncReducers?: DeepPartial<Reducers>) {
    return (StoryComponent: Story) => (
        <StoreProvider asyncReducers={asyncReducers ?? defaultAsyncReducers} initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    );
}
