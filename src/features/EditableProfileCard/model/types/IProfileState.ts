import { IProfile } from "@/entities/Profile";
import { ProfileValidationError } from "../consts/ProfileValidationError";

export interface IProfileState {
    data?: IProfile;
    form?: IProfile;
    isLoading: boolean;
    readonly: boolean;
    error?: string;
    validationErrors?: ProfileValidationError[];
}
