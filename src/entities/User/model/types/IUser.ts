export enum UserRole {
    Admin = "Admin",
    User = "User",
    Manager = "Manager"
}

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
