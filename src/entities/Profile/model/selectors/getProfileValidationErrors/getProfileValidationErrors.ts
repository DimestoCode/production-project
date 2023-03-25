import { IStoreState } from "app/providers/StoreProvider";

export const getProfileValidationErrors = (state: IStoreState) => state.profile?.validationErrors ?? [];
