import { IStoreState } from "app/providers/StoreProvider";
import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword", () => {
    test("should return value", () => {
        const state: DeepPartial<IStoreState> = {
            loginForm: {
                password: "password"
            }
        };
        expect(getLoginPassword(state as IStoreState)).toBe("password");
    });

    test("should work with empty state", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getLoginPassword(state as IStoreState)).toBe("");
    });
});
