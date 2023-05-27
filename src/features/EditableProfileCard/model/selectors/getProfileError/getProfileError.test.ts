import { IStoreState } from "@/app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";

describe("getProfileError", () => {
    test("should return profile error", () => {
        const state: DeepPartial<IStoreState> = {
            profile: {
                error: "Error"
            }
        };
        expect(getProfileError(state as IStoreState)).toStrictEqual("Error");
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileError(state as IStoreState)).toBe("");
    });
});
