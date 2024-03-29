import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import ProfileImg from "@/shared/assets/tests/profile.jpg";
import { retrieveProfileData } from "./retrieveProfileData";
import { IProfile } from "@/entities/Profile/testing";
import { Country } from "@/entities/Country/testing";
import { Currency } from "@/entities/Currency/testing";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("retrieveProfileData", () => {
    test("should be fulfilled", async () => {
        const thunk = new TestAsyncThunk(retrieveProfileData);
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
        thunk.api.get.mockResolvedValue({ data });

        const result = await thunk.callThunk(1);
        expect(thunk.api.get).toHaveBeenCalledWith("/profile/1");
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toStrictEqual(data);
    });

    test("should be rejected", async () => {
        const thunk = new TestAsyncThunk(retrieveProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk(1);
        expect(thunk.api.get).toHaveBeenCalledWith("/profile/1");
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toStrictEqual("Server Error");
    });
});
