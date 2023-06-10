import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { IArticleState } from "@/entities/Article";
import { IUserState } from "@/entities/User";
import { IAddCommentFormState } from "@/features/AddCommentForm";
import { IScrollState } from "@/features/ScrollRestoration";
import { ILoginState } from "@/features/UserAuthentication";
import { IArticlesState } from "@/pages/ArticlesPage";
import { IArticleDetailsPageState } from "@/pages/ArticleDetailsPage";
import { rtkApi } from "@/shared/api/rtkApi";
import { IProfileState } from "@/features/EditableProfileCard";
import { AppDispatch } from "./store";

export interface IStoreState {
    user: IUserState;
    scroll: IScrollState;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async reducers
    loginForm?: ILoginState;
    profile: IProfileState;
    articleDetails?: IArticleState;
    addCommentForm?: IAddCommentFormState;
    articles?: IArticlesState;
    articleDetailsPage?: IArticleDetailsPageState;
}

export type StoreStateKey = keyof IStoreState;
export interface IReducerManager<> {
    getReducerMap: () => ReducersMapObject<IStoreState, AnyAction>;
    reduce: Reducer<IStoreState, AnyAction>;
    add: (key: StoreStateKey, reducer: Reducer<IStoreState[StoreStateKey], AnyAction>) => void;
    remove: (key: StoreStateKey) => void;
    has: (key: StoreStateKey) => boolean;
}
export interface IStoreWithManager extends EnhancedStore<IStoreState> {
    reducerManager: IReducerManager;
}

export interface IThunkExtra {
    api: AxiosInstance;
    navigate?: NavigateFunction;
}

export interface IThunkConfig<T> {
    rejectValue: T;
    extra: IThunkExtra;
    dispatch: AppDispatch;
    state: IStoreState;
}
