import { ReducersMapObject } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Reducers } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { IStoreState } from "../config/IStore";
import { createReduxStore } from "../config/store";

interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<IStoreState>;
    asyncReducers?: DeepPartial<Reducers>;
}

export const StoreProvider = ({ children, initialState, asyncReducers }: IStoreProviderProps) => {
    const navigate = useNavigate();
    return (
        <Provider
            store={createReduxStore(
                initialState as IStoreState,
                asyncReducers as ReducersMapObject<IStoreState>,
                navigate
            )}
        >
            {children}
        </Provider>
    );
};
