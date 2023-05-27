import { IStoreState } from "@/app/providers/StoreProvider";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoading", () => {
    test("should return profile IsLoading", () => {
        const state: DeepPartial<IStoreState> = {
            profile: {
                isLoading: true
            }
        };
        expect(getProfileIsLoading(state as IStoreState)).toBeTruthy();
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileIsLoading(state as IStoreState)).toBeUndefined();
    });
});
