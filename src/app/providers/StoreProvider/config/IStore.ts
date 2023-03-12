import { ICounterState } from "entities/Counter";
import { IUserState } from "entities/User";
import { ILoginState } from "features/UserAuthentication";

export interface IStoreState {
    counter: ICounterState;
    user: IUserState;
    loginForm?: ILoginState;
}
