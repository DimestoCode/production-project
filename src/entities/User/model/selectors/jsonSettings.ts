import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";
import { IJsonSettings } from "../types/IJsonSettings";

const defaultJsonSettings: IJsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state: IStoreState) => state.user.authData?.jsonSettings ?? defaultJsonSettings
);
