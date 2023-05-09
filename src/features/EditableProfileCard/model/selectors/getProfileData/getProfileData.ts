import { IStoreState } from "app/providers/StoreProvider";

export const getProfileData = (state: IStoreState) => state.profile?.data;
