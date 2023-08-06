import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import { initializeAuthData } from "./initializeAuthData";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { IUser, UserRole } from "../../../testing";

const user: DeepPartial<IUser> = {
    avatar: "",
    features: {
        isArticleRatingEnabled: true
    },
    id: 1,
    jsonSettings: {},
    roles: [UserRole.Admin],
    username: "Dima"
};

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));
jest.spyOn(localStorage, "getItem").mockReturnValue("1");

// jest.spyOn(userApi, "getUserByIdQuery");

describe("initializeAuthData", () => {
    test("should be fulfilled if user is retrieved", async () => {
        const thunk = new TestAsyncThunk(initializeAuthData);
        thunk.api.get.mockResolvedValue({ data: user });

        const result = await thunk.callThunk();

        expect(localStorage.getItem).toHaveBeenCalledWith(USER_LOCAL_STORAGE_KEY);

        expect(result.payload).toStrictEqual(user);
    });

    test("should be rejected if the request returns error status", async () => {
        const thunk = new TestAsyncThunk(initializeAuthData);
        thunk.api.get.mockResolvedValue({ status: 401 });

        const result = await thunk.callThunk();

        expect(localStorage.getItem).toHaveBeenCalledWith(USER_LOCAL_STORAGE_KEY);

        expect(result.payload).toEqual("Something went wrong");
    });

    test("should be rejected if there's no json settings in retrieved user object", async () => {
        const thunk = new TestAsyncThunk(initializeAuthData);
        thunk.api.get.mockResolvedValue({
            data: {
                ...user,
                jsonSettings: undefined
            }
        });

        const result = await thunk.callThunk();

        expect(localStorage.getItem).toHaveBeenCalledWith(USER_LOCAL_STORAGE_KEY);

        expect(result.payload).toEqual("Settings are missed");
    });
});
