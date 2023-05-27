import { IStoreState } from "@/app/providers/StoreProvider";

export const getLoginUsername = (state: IStoreState) => state?.loginForm?.username || "";
