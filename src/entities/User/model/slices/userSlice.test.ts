import { userActions, userReducer } from "./userSlice";
import { IUser, IUserState } from "../types/IUser";
import { Theme } from "@/shared/const/theme";
import { setFeatureFlags } from "@/shared/lib/features";
import { IJsonSettings } from "../types/IJsonSettings";
import { saveJsonSettings } from "../services/saveJsonSettings/saveJsonSettings";
import { initializeAuthData } from "../services/initializeAuthData/initializeAuthData";

const state: DeepPartial<IUserState> = {
    authData: {}
};

jest.mock("@/shared/lib/features");

(setFeatureFlags as jest.Mock).mockImplementation();

describe("userSlice", () => {
    describe("setAuthData", () => {
        test("setAuthData sets data to store properly", () => {
            const user: IUser = {
                id: 1,
                username: "Dima",
                jsonSettings: {
                    theme: Theme.Dark
                },
                features: {
                    isArticleRatingEnabled: true,
                    isAppRedesigned: false
                },
                roles: []
            };
            const newState = userReducer(state as IUserState, userActions.setAuthData(user));
            expect(setFeatureFlags).toHaveBeenCalledWith(user.features);
            expect(newState).toStrictEqual({
                authData: user
            });
        });
    });

    describe("logout", () => {
        test("reverts authData state", () => {
            const newState = userReducer(state as IUserState, userActions.logout());

            expect(newState).toStrictEqual({
                authData: undefined
            });
        });
    });

    describe("saveJsonSettings", () => {
        test("should fullfill", () => {
            const settings: IJsonSettings = {
                isFirstVisit: true,
                theme: Theme.Dark,
                settingsPageHasBeenOpen: true
            };
            const newState = userReducer(state as IUserState, { type: saveJsonSettings.fulfilled, payload: settings });

            expect(newState).toStrictEqual({
                ...state,
                authData: {
                    ...state.authData,
                    jsonSettings: settings
                }
            });
        });
    });

    describe("initializeAuthData", () => {
        test("should fullfill", () => {
            const user: IUser = {
                id: 1,
                roles: [],
                username: "Dima",
                jsonSettings: {
                    theme: Theme.Dark
                },
                features: {
                    isArticleRatingEnabled: true,
                    isAppRedesigned: false
                }
            };
            const newState = userReducer(state as IUserState, { type: initializeAuthData.fulfilled, payload: user });
            expect(setFeatureFlags).toHaveBeenCalledWith(user.features);
            expect(newState).toStrictEqual({
                _initialized: true,
                authData: user
            });
        });

        test("should reject", () => {
            const newState = userReducer(state as IUserState, { type: initializeAuthData.rejected });

            expect(newState).toStrictEqual({
                ...state,
                _initialized: true
            });
        });
    });
});
