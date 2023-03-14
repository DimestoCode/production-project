import axios from "axios";
import { IUser, userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk";
import { loginByUsername } from "./loginByUsername";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername", () => {
    test("should be fulfilled", async () => {
        const userData: IUser = { username: "123", id: 1 };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ password: "123", username: "123" });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(userData);
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
    });

    test("should be rejected", async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ password: "123", username: "123" });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toBe("Incorrect login or password");
    });
});
