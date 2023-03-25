import { IStoreState } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import ProfileImg from "shared/assets/tests/profile.jpg";
import { IProfile } from "../../types/IProfile";
import { getProfileData } from "./getProfileData";

describe("getProfileData", () => {
    test("should return profile data", () => {
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
        const state: DeepPartial<IStoreState> = {
            profile: {
                data
            }
        };
        expect(getProfileData(state as IStoreState)).toStrictEqual(data);
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileData(state as IStoreState)).toBeUndefined();
    });
});
