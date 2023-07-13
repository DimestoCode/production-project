import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useProfileReadOnly, getProfileReadOnly] = buildSelector((state: IStoreState) => state.profile?.readonly);
