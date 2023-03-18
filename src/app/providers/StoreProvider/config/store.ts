import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { NavigateFunction } from "react-router-dom";
import { $api } from "shared/api/api";
import { IStoreState, IThunkExtra } from "./IStore";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
    initialStore: IStoreState,
    asyncReducers: ReducersMapObject<IStoreState>,
    navigate?: NavigateFunction
) {
    const rootReducers: ReducersMapObject<IStoreState> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer
    };
    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: IThunkExtra = {
        api: $api,
        navigate
    };

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialStore,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument
                }
            })
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
