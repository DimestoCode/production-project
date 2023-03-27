export interface IUser {
    id: number;
    username: string;
}

export interface IUserState {
    authData?: IUser;
    _initialized: boolean;
}
