import { IStoreState } from "app/providers/StoreProvider";

export const getLoginIsLoading = (state: IStoreState) => state?.loginForm?.isLoading || false;
