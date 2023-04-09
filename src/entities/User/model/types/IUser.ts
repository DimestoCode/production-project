export interface IUser {
    id: number;
    username: string;
    avatar?: string;
}

export interface IUserState {
    authData?: IUser;
    _initialized: boolean;
}
