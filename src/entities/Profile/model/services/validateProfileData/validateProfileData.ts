import { IProfile, ProfileValidationError } from "../../types/IProfile";

export const validateProfileData = (profile: IProfile | undefined) => {
    if (!profile) {
        return [ProfileValidationError.NoData];
    }
    const { firstName, lastName, age, country } = profile;
    const errors: ProfileValidationError[] = [];

    if (!firstName || !lastName) {
        errors.push(ProfileValidationError.IncorrectName);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ProfileValidationError.IncorrectAge);
    }

    if (!country) {
        errors.push(ProfileValidationError.IncorrectCountry);
    }

    return errors;
};
