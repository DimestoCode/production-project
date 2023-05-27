import { IStoreState } from "@/app/providers/StoreProvider";

export const getLoginPassword = (state: IStoreState) => state?.loginForm?.password || "";
