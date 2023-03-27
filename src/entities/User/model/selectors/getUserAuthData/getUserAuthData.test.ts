import { IStoreState } from "app/providers/StoreProvider";
import { getUserAuthData } from "./getUserAuthData";

describe("getUserAuthData", () => {
    test("return auth data", () => {
        const user = {
            authData: {},
            _initialized: true
        };
        const state: DeepPartial<IStoreState> = {
            user
        };
        expect(getUserAuthData(state as IStoreState)).toStrictEqual(user.authData);
    });

    test("returns undefined if state is empty", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getUserAuthData(state as IStoreState)).toBeUndefined();
    });
});
