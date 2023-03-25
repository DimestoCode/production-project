import { IStoreState } from "app/providers/StoreProvider";

export const getProfileIsLoading = (state: IStoreState) => state.profile?.isLoading;
