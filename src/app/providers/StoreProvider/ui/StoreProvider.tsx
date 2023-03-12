import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { IStoreState } from "../config/IStore";
import { createReduxStore } from "../config/store";

interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<IStoreState>;
    asyncReducers?: DeepPartial<ReducersMapObject<IStoreState>>;
}

export const StoreProvider = ({ children, initialState, asyncReducers }: IStoreProviderProps) => (
    <Provider store={createReduxStore(initialState as IStoreState, asyncReducers as ReducersMapObject<IStoreState>)}>
        {children}
    </Provider>
);
