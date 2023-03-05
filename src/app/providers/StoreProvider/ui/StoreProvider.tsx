import { ReactNode } from "react";
import { Provider } from "react-redux";
import { IStoreState } from "../config/IStore";
import { createReduxStore } from "../config/store";

interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: IStoreState;
}

export const StoreProvider = ({ children, initialState }: IStoreProviderProps) => (
    <Provider store={createReduxStore(initialState)}>{children}</Provider>
);
