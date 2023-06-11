import { PayloadAction } from "@reduxjs/toolkit";
import { buildSlice } from "@/shared/lib/store";
import { IAddCommentFormState } from "../types/IAddCommentForm";

const initialState: IAddCommentFormState = {};

export const addCommentFormSlice = buildSlice({
    name: "addCommentForm",
    initialState,
    reducers: {
        setText: (state: IAddCommentFormState, action: PayloadAction<string>) => {
            state.text = action.payload;
        }
    }
});

export const {
    actions: addCommentFormActions,
    reducer: addCommentFormReducer,
    useActions: useAddCommentFormActions
} = addCommentFormSlice;
