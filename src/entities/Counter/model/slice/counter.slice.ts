import { createSlice } from "@reduxjs/toolkit";
import { ICounterState } from "../types/ICounterState";

const initialState: ICounterState = {
    value: 0
};
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});

export const { actions: counterActions, reducer: counterReducer } = counterSlice;
