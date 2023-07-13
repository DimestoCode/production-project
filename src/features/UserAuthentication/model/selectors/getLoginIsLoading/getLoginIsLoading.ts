import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useLoginIsLoading, getLoginIsLoading] = buildSelector(
    (state: IStoreState) => state?.loginForm?.isLoading || false
);
