import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { ICounterState } from "entities/Counter";
import { IProfileState } from "entities/Profile";
import { IUserState } from "entities/User";
import { ILoginState } from "features/UserAuthentication";

export interface IStoreState {
    counter: ICounterState;
    user: IUserState;
    loginForm?: ILoginState;
    profile: IProfileState;
}

export type StoreStateKey = keyof IStoreState;
export interface IReducerManager {
    getReducerMap: () => ReducersMapObject<IStoreState>;
    reduce: (state: IStoreState, action: AnyAction) => CombinedState<IStoreState>;
    add: (key: StoreStateKey, reducer: Reducer) => void;
    remove: (key: StoreStateKey) => void;
}
export interface IStoreWithManager extends EnhancedStore<IStoreState> {
    reducerManager: IReducerManager;
}
