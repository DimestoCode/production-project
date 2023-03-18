import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { ILoginState } from "../types/ILogin";
import { loginActions, loginReducer } from "./loginSlice";

describe("loginSlice", () => {
    test("set username", () => {
        const state: DeepPartial<ILoginState> = {
            username: "123"
        };

        expect(loginReducer(state as ILoginState, loginActions.setUsername("Dima"))).toEqual({ username: "Dima" });
    });

    test("set password", () => {
        const state: DeepPartial<ILoginState> = {
            password: "123"
        };

        expect(loginReducer(state as ILoginState, loginActions.setPassword("Dima"))).toEqual({ password: "Dima" });
    });

    test("login by username pending", async () => {
        const state: DeepPartial<ILoginState> = {
            username: "123",
            password: "123"
        };

        expect(loginReducer(state as ILoginState, loginByUsername.pending)).toEqual({
            ...state,
            isLoading: true,
            error: undefined
        });
    });

    test("loginByUsername fulfilled", () => {
        const state: DeepPartial<ILoginState> = {
            username: "123",
            password: "123"
        };

        expect(loginReducer(state as ILoginState, loginByUsername.fulfilled)).toEqual({
            ...state,
            isLoading: false
        });
    });

    test("loginByUsername rejected", () => {
        const state: DeepPartial<ILoginState> = {
            username: "123",
            password: "123"
        };

        expect(loginReducer(state as ILoginState, { type: loginByUsername.rejected, payload: "Error" })).toEqual({
            ...state,
            isLoading: false,
            error: "Error"
        });
    });
});
