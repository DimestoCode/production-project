import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useLoginPassword, getLoginPassword] = buildSelector(
    (state: IStoreState) => state?.loginForm?.password || ""
);
