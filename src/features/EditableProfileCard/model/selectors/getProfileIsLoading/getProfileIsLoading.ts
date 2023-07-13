import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useProfileIsLoading, getProfileIsLoading] = buildSelector(
    (state: IStoreState) => state.profile?.isLoading
);
