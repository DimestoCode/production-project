import { IStoreState } from "@/app/providers/StoreProvider";

export const getProfileError = (state: IStoreState) => state.profile?.error || "";
