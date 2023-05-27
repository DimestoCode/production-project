import { IStoreState } from "@/app/providers/StoreProvider";

export const getProfileForm = (state: IStoreState) => state.profile?.form;
