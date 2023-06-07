import { Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { IStoreState, IStoreWithManager, StoreStateKey } from "@/app/providers/StoreProvider";

export type Reducers = {
    [name in StoreStateKey]?: Reducer<NonNullable<IStoreState[name]>>;
};

export interface IDynamicLoaderProps {
    reducers: DeepPartial<Reducers>;
    removeOnUnmount?: boolean;
}

export const useDynamicModuleLoader = ({ reducers, removeOnUnmount = false }: IDynamicLoaderProps) => {
    const store = useStore() as IStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const reducersEntries = Object.entries<Reducers>(reducers) as Array<[StoreStateKey, Reducer]>;

        reducersEntries.forEach(([name, reducer]) => {
            if (!store.reducerManager.has(name)) {
                store.reducerManager.add(name, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
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
