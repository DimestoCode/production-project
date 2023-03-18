import { IStoreState } from "app/providers/StoreProvider";
import { getLoginIsLoading } from "./getLoginIsLoading";

describe("getLoginIsLoading", () => {
    test("should return value", () => {
        const state: DeepPartial<IStoreState> = {
            loginForm: {
                isLoading: true
            }
        };
        expect(getLoginIsLoading(state as IStoreState)).toBeTruthy();
    });

    test("should work with empty state", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getLoginIsLoading(state as IStoreState)).toBeFalsy();
    });
});
