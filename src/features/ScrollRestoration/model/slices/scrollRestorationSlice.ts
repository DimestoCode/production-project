import { PayloadAction } from "@reduxjs/toolkit";
import { buildSlice } from "@/shared/lib/store";
import { IScrollState } from "../types/IScroll";

const initialState: IScrollState = {};

export const scrollRestorationSlice = buildSlice({
    name: "scroll",
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state[payload.path] = payload.position;
        }
    }
});

export const {
    actions: scrollRestorationActions,
    reducer: scrollRestorationReducer,
    useActions: useScrollRestorationActions
} = scrollRestorationSlice;
