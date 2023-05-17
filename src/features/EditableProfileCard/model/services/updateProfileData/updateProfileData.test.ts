import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import ProfileImg from "shared/assets/tests/profile.jpg";
import { IProfile } from "entities/Profile";
import { ProfileValidationError } from "../../consts/ProfileValidationError";
import { updateProfileData } from "./updateProfileData";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

const data: IProfile = {
    id: 1,
    username: "admin",
    age: 22,
    city: "NY",
    country: Country.USA,
    currency: Currency.USD,
    firstName: "Dima",
    lastName: "Andoniev",
    avatar: ProfileImg
};
describe("updateProfileData", () => {
    test("returns updated profile data if thunk is fullfilled", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });

        thunk.api.put.mockResolvedValue({ data });

        const result = await thunk.callThunk();
        expect(thunk.api.put).toHaveBeenCalledWith("/profile/1", data);
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toStrictEqual(data);
    });

    test("returns server error if thunk is rejected after request failure", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        });
        thunk.api.put.mockResolvedValue({ status: 403 });

        const result = await thunk.callThunk();
        expect(thunk.api.put).toHaveBeenCalledWith("/profile/1", data);
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toStrictEqual(["Server Error"]);
    });

    test("returns client validation errors if profile data is incorrect", async () => {
        const incorrectProfile: IProfile = {
            ...data,
            firstName: "",
            lastName: "",
            age: undefined,
            country: undefined
        };
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: incorrectProfile
            }
        });

        const result = await thunk.callThunk();
        expect(thunk.api.put).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toStrictEqual([
            ProfileValidationError.IncorrectName,
            ProfileValidationError.IncorrectAge,
            ProfileValidationError.IncorrectCountry
        ]);
    });
});
