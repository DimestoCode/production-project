import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useProfileValidationErrors, getProfileValidationErrors] = buildSelector(
    (state: IStoreState) => state.profile?.validationErrors ?? []
);
