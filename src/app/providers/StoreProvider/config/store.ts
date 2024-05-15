import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import { scrollRestorationReducer } from "@/features/ScrollRestoration";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { IReducerManager, IStoreState, IThunkExtra } from "./IStore";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(initialStore: IStoreState, asyncReducers: ReducersMapObject<IStoreState>) {
    const rootReducers: ReducersMapObject<IStoreState> = {
        ...asyncReducers,
        user: userReducer,
        scroll: scrollRestorationReducer,
        [rtkApi.reducerPath]: rtkApi.reducer
    };
    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: IThunkExtra = {
        api: $api
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
            }).concat(rtkApi.middleware)
    });

    type CustomStore = typeof store & {
        reducerManager: IReducerManager;
    };

    (store as CustomStore).reducerManager = reducerManager;

    return store as CustomStore;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
