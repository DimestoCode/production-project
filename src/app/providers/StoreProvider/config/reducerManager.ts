import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { IReducerManager, IStoreState, StoreStateKey } from "./IStore";

export function createReducerManager(initialReducers: ReducersMapObject<IStoreState>): IReducerManager {
    const reducers: ReducersMapObject<IStoreState> = { ...initialReducers };

    let combinedReducer: Reducer<IStoreState> = combineReducers<IStoreState>(reducers);

    let keysToRemove: StoreStateKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: IStoreState | undefined, action: AnyAction) => {
            if (keysToRemove.length > 0 && state) {
                // eslint-disable-next-line no-param-reassign
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state![key];
                });

                keysToRemove = [];
            }

            return combinedReducer(state, action);
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
