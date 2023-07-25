import { IFeatureFlags } from "@/shared/types/featureFlags";
import { UserRole } from "../consts/consts";

export interface IUser {
    id: number;
    username: string;
    avatar?: string;
    roles: UserRole[];
    features?: IFeatureFlags;
}

export interface IUserState {
    authData?: IUser;
    _initialized: boolean;
}
