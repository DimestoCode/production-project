import { DeepPartial } from "@reduxjs/toolkit";
import { IStoreState } from "app/providers/StoreProvider";
import { getCounterValue } from "./getCounterValue";

describe("getCounterValue.test", () => {
    test("getCounterValue", () => {
        const state: DeepPartial<IStoreState> = {
            counter: { value: 10 }
        };
        expect(getCounterValue(state as IStoreState)).toEqual(10);
    });
});
