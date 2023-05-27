import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { scrollRestorationReducer } from "@/features/ScrollRestoration";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { IStoreState, IThunkExtra } from "./IStore";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(initialStore: IStoreState, asyncReducers: ReducersMapObject<IStoreState>) {
    const rootReducers: ReducersMapObject<IStoreState> = {
        ...asyncReducers,
        counter: counterReducer,
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

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
