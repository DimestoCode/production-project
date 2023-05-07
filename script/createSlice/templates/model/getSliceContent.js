const capitalizeString = require("../../capitalizeString");

module.exports = (sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);
    return `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I${capitalizedSliceName}State } from "../types/I${capitalizedSliceName}";

const initialState: I${capitalizedSliceName}State = {};

export const ${sliceName}Slice = createSlice({
    name: "${sliceName}",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(.pending, (state) => {
    //         })
    //         .addCase(.fulfilled, (state, action) => {
    //         })
    //         .addCase(.rejected, (state, action) => {
    //         })
    // }
});

export const { actions: ${sliceName}Actions, reducer: ${sliceName}Reducer } = ${sliceName}Slice;`;
};
