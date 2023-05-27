import { IStoreState } from "@/app/providers/StoreProvider";
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetailsSelectors";

describe("articleDetailsSelectors", () => {
    describe("getArticleDetailsData", () => {
        it("returns data if it's present", () => {
            const store: DeepPartial<IStoreState> = {
                articleDetails: {
                    data: {
                        id: 1
                    }
                }
            };

            expect(getArticleDetailsData(store as IStoreState)).toStrictEqual({ id: 1 });
        });

        it("returns undefined is store is empty", () => {
            const store: DeepPartial<IStoreState> = {};

            expect(getArticleDetailsData(store as IStoreState)).toBeUndefined();
        });
    });

    describe("getArticleDetailsError", () => {
        it("returns error if it's present", () => {
            const store: DeepPartial<IStoreState> = {
                articleDetails: {
                    error: "Error"
                }
            };

            expect(getArticleDetailsError(store as IStoreState)).toEqual("Error");
        });

        it("returns undefined is store is empty", () => {
            const store: DeepPartial<IStoreState> = {};

            expect(getArticleDetailsError(store as IStoreState)).toBeUndefined();
        });
    });

    describe("getArticleDetailsError", () => {
        it("returns isLoading if it's present", () => {
            const store: DeepPartial<IStoreState> = {
                articleDetails: {
                    isLoading: true
                }
            };

            expect(getArticleDetailsIsLoading(store as IStoreState)).toBeTruthy();
        });

        it("returns undefined is store is empty", () => {
            const store: DeepPartial<IStoreState> = {};

            expect(getArticleDetailsIsLoading(store as IStoreState)).toBeUndefined();
        });
    });
});
