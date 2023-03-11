import { ICounterState } from "entities/Counter";
import { IUserState } from "entities/User";

export interface IStoreState {
    counter: ICounterState;
    user: IUserState;
}
