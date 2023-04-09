import { IAddCommentFormState } from "../types/IAddCommentForm";
import { addCommentFormActions, addCommentFormReducer } from "./addCommentFormSlice";

describe("addCommentFormSlice", () => {
    test("setText", () => {
        const state: DeepPartial<IAddCommentFormState> = {
            text: "Text"
        };
        expect(addCommentFormReducer(state, addCommentFormActions.setText("New Text"))).toStrictEqual({
            text: "New Text"
        });
    });
});
