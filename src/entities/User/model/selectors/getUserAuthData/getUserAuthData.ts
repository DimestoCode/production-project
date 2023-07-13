import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useUserAuthData, getUserAuthData] = buildSelector((state: IStoreState) => state.user?.authData);
