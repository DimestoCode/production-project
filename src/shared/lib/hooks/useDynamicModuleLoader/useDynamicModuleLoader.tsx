import { Reducer } from "@reduxjs/toolkit";
import { IStoreWithManager } from "app/providers/StoreProvider";
import { StoreStateKey } from "app/providers/StoreProvider/config/IStore";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type Reducers = {
    [name in StoreStateKey]?: Reducer;
};

type ReducersEntry = [StoreStateKey, Reducer];

export interface IDynamicLoaderProps {
    reducers: Reducers;
    removeOnUnmount: boolean;
}

export const useDynamicModuleLoader = ({ reducers, removeOnUnmount }: IDynamicLoaderProps) => {
    const store = useStore() as IStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeOnUnmount) {
                Object.entries(reducers).forEach(([name]: ReducersEntry) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, [store.reducerManager, dispatch, reducers, removeOnUnmount]);
};
