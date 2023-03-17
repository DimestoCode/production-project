import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { IStoreState } from "./IStore";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(initialStore: IStoreState, asyncReducers: ReducersMapObject<IStoreState>) {
    const rootReducers: ReducersMapObject<IStoreState> = {
        counter: counterReducer,
        user: userReducer,
        ...asyncReducers
    };
    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<IStoreState>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialStore
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
