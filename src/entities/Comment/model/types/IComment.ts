import { IUser } from "entities/User";

export interface IComment {
    id: number;
    user: IUser;
    text: string;
}
