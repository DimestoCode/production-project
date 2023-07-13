import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useUserInitialized, getUserInitialized] = buildSelector(
    (state: IStoreState) => state.user?._initialized ?? false
);
