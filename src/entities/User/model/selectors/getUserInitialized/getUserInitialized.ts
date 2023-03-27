import { IStoreState } from "app/providers/StoreProvider";

export const getUserInitialized = (state: IStoreState) => state.user?._initialized ?? false;
