import { IStoreState } from "app/providers/StoreProvider";

export const getUserAuthData = (state: IStoreState) => state.user?.authData;
