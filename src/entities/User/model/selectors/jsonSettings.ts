import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";
import { IJSonSettings } from "../types/IJsonSettings";

const defaultJsonSettings: IJSonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state: IStoreState) => state.user.authData?.jsonSettings ?? defaultJsonSettings
);
