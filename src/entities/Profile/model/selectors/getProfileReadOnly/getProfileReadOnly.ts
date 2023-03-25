import { IStoreState } from "app/providers/StoreProvider";

export const getProfileReadOnly = (state: IStoreState) => state.profile?.readonly;
