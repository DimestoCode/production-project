import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScrollState } from "../types/IScroll";

const initialState: IScrollState = {};

export const scrollRestorationSlice = createSlice({
    name: "scroll",
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state[payload.path] = payload.position;
        }
    }
});

export const { actions: scrollRestorationActions, reducer: scrollRestorationReducer } = scrollRestorationSlice;
