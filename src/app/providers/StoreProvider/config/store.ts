import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { IStoreState } from "./IStore";

export function createReduxStore(initialStore: IStoreState) {
    const rootReducers: ReducersMapObject<IStoreState> = {
        counter: counterReducer,
        user: userReducer
    };

    return configureStore<IStoreState>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialStore
    });
}
