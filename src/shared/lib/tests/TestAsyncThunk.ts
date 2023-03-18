import { AsyncThunkAction } from "@reduxjs/toolkit";
import { IStoreState } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<ReturnType, ArgType, RejectedType> = (arg: ArgType) => AsyncThunkAction<
    ReturnType,
    ArgType,
    {
        rejectValue: RejectedType;
    }
>;

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<ReturnType, ArgType, RejectedType> {
    dispatch: jest.Mocked<any>;

    getState: () => IStoreState;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.Mocked<any>;

    actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedType>;

    constructor(actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedType>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    async callThunk(arg: ArgType) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });

        return result;
    }
}
