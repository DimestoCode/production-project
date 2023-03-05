import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { IStoreState } from "./IStore";

export function createReduxStore(initialStore: IStoreState) {
    return configureStore<IStoreState>({
        reducer: {
            counter: counterReducer
        },
        devTools: __IS_DEV__,
        preloadedState: initialStore
    });
}
