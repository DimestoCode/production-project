import { IStoreState } from "app/providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername", () => {
    test("should return value", () => {
        const state: DeepPartial<IStoreState> = {
            loginForm: {
                username: "username"
            }
        };
        expect(getLoginUsername(state as IStoreState)).toBe("username");
    });

    test("should work with empty state", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getLoginUsername(state as IStoreState)).toBeFalsy();
    });
});
