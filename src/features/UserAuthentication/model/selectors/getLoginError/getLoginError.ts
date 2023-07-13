import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useLoginError, getLoginError] = buildSelector((state: IStoreState) => state?.loginForm?.error);
