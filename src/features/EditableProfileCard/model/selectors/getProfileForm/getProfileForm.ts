import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useProfileForm, getProfileForm] = buildSelector((state: IStoreState) => state.profile?.form);
