import { IStoreState } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country/testing";
import { Currency } from "@/entities/Currency/testing";
import { IProfile } from "@/entities/Profile/testing";
import ProfileImg from "@/shared/assets/tests/profile.jpg";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm", () => {
    test("should return profilee form", () => {
        const formData: IProfile = {
            username: "admin",
            age: 22,
            city: "NY",
            country: Country.USA,
            currency: Currency.USD,
            firstName: "Dima",
            lastName: "Andoniev",
            avatar: ProfileImg
        };
        const state: DeepPartial<IStoreState> = {
            profile: {
                form: formData
            }
        };
        expect(getProfileForm(state as IStoreState)).toStrictEqual(formData);
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileForm(state as IStoreState)).toBeUndefined();
    });
});
