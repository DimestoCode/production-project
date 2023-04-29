import { IStoreState } from "app/providers/StoreProvider";
import { getArticleCommentsError, getArticleCommentsIsLoading } from "./commentsSelectors";

describe("commentsSelectors", () => {
    describe("getArticleCommentsIsLoading", () => {
        it("returns isLoading if state isn't empty", () => {
            const state: DeepPartial<IStoreState> = {
                articleDetailsPage: {
                    comments: {
                        isLoading: false
                    }
                }
            };

            expect(getArticleCommentsIsLoading(state as IStoreState)).toBeFalsy();
        });

        it("returns undefined if state is empty", () => {
            const state: DeepPartial<IStoreState> = {};

            expect(getArticleCommentsIsLoading(state as IStoreState)).toBeUndefined();
        });
    });

    describe("getArticleCommentsError", () => {
        it("returns error if state isn't empty", () => {
            const state: DeepPartial<IStoreState> = {
                articleDetailsPage: {
                    comments: {
                        error: "error"
                    }
                }
            };

            expect(getArticleCommentsError(state as IStoreState)).toBe("error");
        });

        it("returns undefined if state is empty", () => {
            const state: DeepPartial<IStoreState> = {};

            expect(getArticleCommentsError(state as IStoreState)).toBeUndefined();
        });
    });
});
