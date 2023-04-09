import { IStoreState } from "app/providers/StoreProvider";
import { getAddCommentFormError, getAddCommentFormText } from "./addCommentFormSelectors";

describe("addCommentFormSelectors", () => {
    describe("getAddCommentFormText", () => {
        it("returns text if it's present", () => {
            const state: DeepPartial<IStoreState> = {
                addCommentForm: {
                    text: "Text"
                }
            };

            expect(getAddCommentFormText(state as IStoreState)).toBe("Text");
        });

        it("returns empty string if state's empty", () => {
            const state: DeepPartial<IStoreState> = {};

            expect(getAddCommentFormText(state as IStoreState)).toBe("");
        });
    });

    describe("getAddCommentFormError", () => {
        it("returns error if it's present", () => {
            const state: DeepPartial<IStoreState> = {
                addCommentForm: {
                    error: "Error"
                }
            };

            expect(getAddCommentFormError(state as IStoreState)).toBe("Error");
        });

        it("returns undefined string if state's empty", () => {
            const state: DeepPartial<IStoreState> = {};

            expect(getAddCommentFormError(state as IStoreState)).toBeUndefined();
        });
    });
});
