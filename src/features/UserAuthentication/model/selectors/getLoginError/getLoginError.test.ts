import { IStoreState } from "app/providers/StoreProvider";
import { getLoginError } from "./getLoginError";

describe("getLoginError", () => {
    test("should return error", () => {
        const state: DeepPartial<IStoreState> = {
            loginForm: {
                error: "error"
            }
        };
        expect(getLoginError(state as IStoreState)).toBe("error");
    });

    test("should work with empty state", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getLoginError(state as IStoreState)).toBeUndefined();
    });
});
