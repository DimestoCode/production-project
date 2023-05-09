import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import { IReducerManager, IStoreState, StoreStateKey } from "./IStore";

export function createReducerManager(initialReducers: ReducersMapObject<IStoreState>): IReducerManager {
    const reducers: ReducersMapObject<IStoreState> = { ...initialReducers };

    let combinedReducer: Reducer<IStoreState> = combineReducers<IStoreState>(reducers);

    let keysToRemove: StoreStateKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: IStoreState | undefined, action: AnyAction) => {
            let newState: IStoreState | undefined;
            if (keysToRemove.length > 0 && state) {
                newState = cloneDeep(state);
                keysToRemove.forEach((key) => {
                    delete newState?.[key];
                });

                keysToRemove = [];
            }

            return combinedReducer(newState ?? state, action);
        },

        add: (key: StoreStateKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StoreStateKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },

        has: (key: StoreStateKey) => {
            return !!reducers?.[key];
        }
    };
}
