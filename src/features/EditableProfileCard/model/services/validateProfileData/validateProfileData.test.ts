import { Country } from "@/entities/Country/testing";
import { Currency } from "@/entities/Currency/testing";
import { IProfile } from "@/entities/Profile/testing";
import ProfileImg from "@/shared/assets/tests/profile.jpg";
import { ProfileValidationError } from "../../consts/ProfileValidationError";
import { validateProfileData } from "./validateProfileData";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

const data: IProfile = {
    username: "admin",
    age: 22,
    city: "NY",
    country: Country.USA,
    currency: Currency.USD,
    firstName: "Dima",
    lastName: "Andoniev",
    avatar: ProfileImg
};

const nameCases: Array<[string, string, IProfile | undefined, ProfileValidationError[]]> = [
    [
        ProfileValidationError.IncorrectName,
        "firstName",
        { ...data, firstName: "" },
        [ProfileValidationError.IncorrectName]
    ],
    [
        ProfileValidationError.IncorrectName,
        "lastName",
        { ...data, lastName: "" },
        [ProfileValidationError.IncorrectName]
    ],
    [ProfileValidationError.IncorrectAge, "age", { ...data, age: undefined }, [ProfileValidationError.IncorrectAge]],
    [ProfileValidationError.IncorrectAge, "age", { ...data, age: 12.5 }, [ProfileValidationError.IncorrectAge]],
    [
        ProfileValidationError.IncorrectCountry,
        "country",
        { ...data, country: undefined },
        [ProfileValidationError.IncorrectCountry]
    ],
    [ProfileValidationError.NoData, "profile", undefined, [ProfileValidationError.NoData]]
];

describe("validateProfileData", () => {
    test.each(nameCases)("returns %p error if %p is empty or incorrect ", async (a, b, profile, expectedErrors) => {
        const errors = validateProfileData(profile);
        expect(errors).toStrictEqual(expectedErrors);
    });

    test("returns all errors together", () => {
        const errors = validateProfileData({ ...data, firstName: "", age: 12.5, country: undefined });
        expect(errors).toStrictEqual([
            ProfileValidationError.IncorrectName,
            ProfileValidationError.IncorrectAge,
            ProfileValidationError.IncorrectCountry
        ]);
    });
});
