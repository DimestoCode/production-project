import { IStoreState } from "@/app/providers/StoreProvider";

export const getLoginState = (state: IStoreState | undefined) => state?.loginForm;
