import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import { saveJsonSettings } from "./saveJsonSettings";
import { IUser } from "../../../testing";
import { Theme } from "@/shared/const/theme";

const user: DeepPartial<IUser> = {
    avatar: "",
    id: 1,
    jsonSettings: {
        theme: Theme.Dark
    }
};

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("saveJsonSettings.test", () => {
    test("should fulfill", async () => {
        const thunk = new TestAsyncThunk(saveJsonSettings, {
            user: {
                authData: {
                    id: 1
                }
            }
        });

        thunk.api.patch.mockResolvedValue({ data: user });

        const response = await thunk.callThunk({
            theme: Theme.Dark
        });

        expect(thunk.api.patch).toBeCalledWith("users/1", {
            userId: user.id,
            jsonSettings: user.jsonSettings
        });

        expect(response.payload).toStrictEqual(user.jsonSettings);

        expect(response.meta.requestStatus).toBe("fulfilled");
    });

    test("should reject if user id is empty", async () => {
        const thunk = new TestAsyncThunk(saveJsonSettings, {
            user: {}
        });

        const response = await thunk.callThunk({
            theme: Theme.Dark
        });

        expect(response.payload).toBe("User is not authorized");
        expect(response.meta.requestStatus).toBe("rejected");
    });

    test("should reject if retrieved jsonSettings are empty", async () => {
        const thunk = new TestAsyncThunk(saveJsonSettings, {
            user: {
                authData: {
                    id: 1
                }
            }
        });

        thunk.api.patch.mockResolvedValue({
            data: {
                ...user,
                jsonSettings: undefined
            }
        });

        const response = await thunk.callThunk({ theme: Theme.Dark });

        expect(response.meta.requestStatus).toBe("rejected");
        expect(response.payload).toBe("Settings are missed");
    });

    test("should reject if response has an error status", async () => {
        const thunk = new TestAsyncThunk(saveJsonSettings, {
            user: {
                authData: {
                    id: 1
                }
            }
        });

        thunk.api.patch.mockImplementation(() => {
            throw new Error();
        });

        const response = await thunk.callThunk({ theme: Theme.Dark });

        expect(response.meta.requestStatus).toBe("rejected");
        expect(response.payload).toBe("Something went wrong");
    });
});
