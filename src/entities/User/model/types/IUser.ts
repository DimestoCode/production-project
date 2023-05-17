import { UserRole } from "../consts/consts";

export interface IUser {
    id: number;
    username: string;
    avatar?: string;
    roles: UserRole[];
}

export interface IUserState {
    authData?: IUser;
    _initialized: boolean;
}
