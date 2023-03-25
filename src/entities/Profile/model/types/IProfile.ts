import { Currency } from "entities/Currency";
import { Country } from "entities/Country/model/country";

export enum ProfileValidationError {
    NoData = "No Profile Data",
    IncorrectName = "Incorrect Name",
    IncorrectAge = "Incorrect Age",
    IncorrectCountry = "Incorrect Country",
    ServerError = "Server Error"
}
export interface IProfile {
    firstName?: string;
    lastName?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}

export interface IProfileState {
    data?: IProfile;
    form?: IProfile;
    isLoading: boolean;
    readonly: boolean;
    error?: string;
    validationErrors?: ProfileValidationError[];
}
