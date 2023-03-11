export interface IUser {
    id: string;
    username: string;
}

export interface IUserState {
    authData?: IUser;
}
