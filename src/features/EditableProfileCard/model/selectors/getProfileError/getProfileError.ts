import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useProfileError, getProfileError] = buildSelector((state: IStoreState) => state.profile?.error || "");
