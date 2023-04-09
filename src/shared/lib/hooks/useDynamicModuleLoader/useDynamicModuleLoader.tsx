import { Reducer } from "@reduxjs/toolkit";
import { IStoreWithManager } from "app/providers/StoreProvider";
import { StoreStateKey } from "app/providers/StoreProvider/config/IStore";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type Reducers = {
    [name in StoreStateKey]?: Reducer;
};

export interface IDynamicLoaderProps {
    reducers: DeepPartial<Reducers>;
    removeOnUnmount?: boolean;
}

export const useDynamicModuleLoader = ({ reducers, removeOnUnmount = true }: IDynamicLoaderProps) => {
    const store = useStore() as IStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StoreStateKey, reducer as Reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeOnUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StoreStateKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, [store.reducerManager, dispatch, reducers, removeOnUnmount]);
};
