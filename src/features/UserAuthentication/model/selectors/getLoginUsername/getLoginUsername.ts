import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useLoginUsername, getLoginUsername] = buildSelector(
    (state: IStoreState) => state?.loginForm?.username || ""
);
