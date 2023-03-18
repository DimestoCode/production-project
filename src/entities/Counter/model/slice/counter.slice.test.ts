import { ICounterState } from "../types/ICounterState";
import { counterActions, counterReducer } from "./counter.slice";

describe("counter.slice", () => {
    test("increment", () => {
        const state: DeepPartial<ICounterState> = {
            value: 10
        };
        expect(counterReducer(state as ICounterState, counterActions.increment)).toEqual({ value: 11 });
    });
    test("decrement", () => {
        const state: DeepPartial<ICounterState> = {
            value: 10
        };
        expect(counterReducer(state as ICounterState, counterActions.decrement)).toEqual({ value: 9 });
    });

    test("should work with empty state", () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({ value: 1 });
    });
});
