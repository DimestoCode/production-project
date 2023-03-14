import { DeepPartial } from "@reduxjs/toolkit";
import { IStoreState } from "app/providers/StoreProvider";
import { getLoginState } from "./getLoginState";

describe("getLoginState", () => {
    test("should return value", () => {
        const state: DeepPartial<IStoreState> = {
            loginForm: {
                isLoading: true,
                password: "password",
                username: "username",
                error: "error"
            }
        };
        expect(getLoginState(state as IStoreState)).toEqual({
            isLoading: true,
            password: "password",
            username: "username",
            error: "error"
        });
    });

    test("should work with empty state", () => {
        expect(getLoginState(undefined)).toBeUndefined();
    });
});
