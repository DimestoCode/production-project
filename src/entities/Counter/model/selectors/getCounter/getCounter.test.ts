import { IStoreState } from "@/app/providers/StoreProvider";
import { getCounter } from "./getCounter";

describe("getCounter", () => {
    test("should return counter value", () => {
        const state: DeepPartial<IStoreState> = {
            counter: { value: 10 }
        };
        expect(getCounter(state as IStoreState)).toEqual({ value: 10 });
    });
});
