import { Country, Currency } from "shared/const/common";

export interface IProfile {
    firstName: string;
    lastName: string;
    age: number;
    currency: Currency;
    country: Country;
    city: string;
    username: string;
    avatar: string;
}

export interface IProfileState {
    data: IProfile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
