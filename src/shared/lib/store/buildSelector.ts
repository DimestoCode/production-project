import { useSelector } from "react-redux";
import { IStoreState } from "@/app/providers/StoreProvider";

type Selector<ReturnDataType, Args extends unknown[]> = (state: IStoreState, ...args: Args) => ReturnDataType;
type Hook<ReturnHookType, Args extends unknown[]> = (...args: Args) => ReturnHookType;
type Result<ReturnDataType, Args extends unknown[]> = [Hook<ReturnDataType, Args>, Selector<ReturnDataType, Args>];

export function buildSelector<ReturnDataType, Args extends unknown[]>(
    selector: Selector<ReturnDataType, Args>
): Result<ReturnDataType, Args> {
    const useSelectorHook: Hook<ReturnDataType, Args> = (...args: Args) => {
        return useSelector((state: IStoreState) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
