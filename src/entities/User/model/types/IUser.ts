import { IFeatureFlags } from "@/shared/types/featureFlags";
import { UserRole } from "../consts/consts";
import { IJsonSettings } from "./IJsonSettings";

export interface IUser {
    id: number;
    username: string;
    avatar?: string;
    roles: UserRole[];
    features?: IFeatureFlags;
    jsonSettings?: IJsonSettings;
}

export interface IUserState {
    authData?: IUser;
    _initialized: boolean;
}
