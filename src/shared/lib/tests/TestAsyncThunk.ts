import { AsyncThunkAction } from "@reduxjs/toolkit";
import { IStoreState } from "app/providers/StoreProvider";

type ActionCreatorType<ReturnType, ArgType, RejectedType> = (arg: ArgType) => AsyncThunkAction<
    ReturnType,
    ArgType,
    {
        rejectValue: RejectedType;
    }
>;

export class TestAsyncThunk<ReturnType, ArgType, RejectedType> {
    dispatch: jest.Mocked<any>;

    getState: () => IStoreState;

    actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedType>;

    constructor(actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedType>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    async callThunk(arg: ArgType) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, undefined);

        return result;
    }
}
