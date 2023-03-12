import { IStoreState } from "app/providers/StoreProvider";

export const getLoginError = (state: IStoreState) => state?.loginForm?.error;
