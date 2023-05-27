import { IStoreState } from "@/app/providers/StoreProvider";
import { ProfileValidationError } from "../../consts/ProfileValidationError";
import { getProfileValidationErrors } from "./getProfileValidationErrors";

describe("getProfileValidationErrors", () => {
    test("should return profileeValidationErrors", () => {
        const state: DeepPartial<IStoreState> = {
            profile: {
                validationErrors: [ProfileValidationError.IncorrectAge]
            }
        };
        expect(getProfileValidationErrors(state as IStoreState)).toStrictEqual([ProfileValidationError.IncorrectAge]);
    });

    test("should return undefined", () => {
        const state: DeepPartial<IStoreState> = {};
        expect(getProfileValidationErrors(state as IStoreState)).toStrictEqual([]);
    });
});
