import { IStoreState } from "@/app/providers/StoreProvider";

export const getCounter = (state: IStoreState) => state.counter;
