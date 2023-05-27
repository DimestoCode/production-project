import { IStoreState } from "@/app/providers/StoreProvider";
import { getUserInitialized } from "./getUserInitialized";

describe("getUserInitialized", () => {
    test("return user initialized property", () => {
        const user = {
            authData: {},
            _initialized: true
        };
        const state: DeepPartial<IStoreState> = {
            user
        };
        expect(getUserInitialized(state as IStoreState)).toBeTruthy();
    });

    test("returns false if state is empty", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getUserInitialized(state as IStoreState)).toBeFalsy();
    });
});
