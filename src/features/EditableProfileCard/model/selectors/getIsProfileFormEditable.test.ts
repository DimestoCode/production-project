import { IStoreState } from "app/providers/StoreProvider";
import { getIsProfileFormEditable } from "./getIsProfileFormEditable";

describe("getIsProfileFormEditable", () => {
    test("returns true if ids of user and profile are the same", () => {
        const state: DeepPartial<IStoreState> = {
            user: {
                authData: {
                    id: 1
                }
            },
            profile: {
                data: {
                    id: 1
                }
            }
        };

        expect(getIsProfileFormEditable(state as IStoreState)).toBeTruthy();
    });

    test("returns false if ids of user and profile are not the same", () => {
        const state: DeepPartial<IStoreState> = {
            user: {
                authData: {
                    id: 2
                }
            },
            profile: {
                data: {
                    id: 1
                }
            }
        };

        expect(getIsProfileFormEditable(state as IStoreState)).toBeFalsy();
    });
});
