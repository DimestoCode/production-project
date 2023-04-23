import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { IArticleState } from "entities/Article";
import { ICounterState } from "entities/Counter";
import { IProfileState } from "entities/Profile";
import { IUserState } from "entities/User";
import { IAddCommentFormState } from "features/AddCommentForm";
import { ILoginState } from "features/UserAuthentication";
import { IArticleCommentsState } from "pages/ArticleDetailsPage/model/types/IArticleCommentsState";
import { IArticlesState } from "pages/ArticlesPage";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "./store";

export interface IStoreState {
    counter: ICounterState;
    user: IUserState;
    // async reducers
    loginForm?: ILoginState;
    profile: IProfileState;
    articleDetails?: IArticleState;
    articleComments?: IArticleCommentsState;
    addCommentForm?: IAddCommentFormState;
    articles?: IArticlesState;
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
