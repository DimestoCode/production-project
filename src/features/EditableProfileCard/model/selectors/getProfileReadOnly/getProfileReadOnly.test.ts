import { IStoreState } from "@/app/providers/StoreProvider";
import { getProfileReadOnly } from "./getProfileReadOnly";

describe("getProfileReadOnly", () => {
    test("should return profile ReadOnly", () => {
        const state: DeepPartial<IStoreState> = {
            profile: {
                readonly: true
            }
        };
        expect(getProfileReadOnly(state as IStoreState)).toBeTruthy();
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileReadOnly(state as IStoreState)).toBeUndefined();
    });
});
