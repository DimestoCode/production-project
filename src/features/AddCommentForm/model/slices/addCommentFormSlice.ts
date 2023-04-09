import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddCommentFormState } from "../types/IAddCommentForm";

const initialState: IAddCommentFormState = {};

export const addCommentFormSlice = createSlice({
    name: "addCommentForm",
    initialState,
    reducers: {
        setText: (state: IAddCommentFormState, action: PayloadAction<string>) => {
            state.text = action.payload;
        }
    }
});

export const { actions: addCommentFormActions, reducer: addCommentFormReducer } = addCommentFormSlice;
