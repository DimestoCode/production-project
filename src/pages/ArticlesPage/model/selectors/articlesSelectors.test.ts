import { IStoreState } from "@/app/providers/StoreProvider";
import {
    getArticlesIsLoading,
    getArticlesView,
    getArticlesPageNumber,
    getArticlesPageLimit,
    getArticlesError,
    getArticlesHasMore,
    getArticlesInitialized
} from "./articlesSelectors";

describe("articlesSelectors", () => {
    const state: DeepPartial<IStoreState> = {
        articles: {
            isLoading: true,
            error: "Error",
            view: "list",
            page: 2,
            limit: 2,
            initialized: true,
            hasMore: true
        }
    };

    describe("getArticlesIsLoading", () => {
        test("returns isLoading from state", () => {
            expect(getArticlesIsLoading(state as IStoreState)).toBeTruthy();
        });

        test("returns default value for isLoading if state is empty", () => {
            expect(getArticlesIsLoading({} as IStoreState)).toBeFalsy();
        });
    });

    describe("getArticlesError", () => {
        test("returns error from state", () => {
            expect(getArticlesError(state as IStoreState)).toBe("Error");
        });

        test("returns default value for error if state is empty", () => {
            expect(getArticlesError({} as IStoreState)).toBe("");
        });
    });

    describe("getArticlesView", () => {
        test("returns viewMode from state", () => {
            expect(getArticlesView(state as IStoreState)).toBe("list");
        });

        test("returns default value for viewMode if state is empty", () => {
            expect(getArticlesView({} as IStoreState)).toBe("grid");
        });
    });

    describe("getArticlesPageNumber", () => {
        test("returns page number from state", () => {
            expect(getArticlesPageNumber(state as IStoreState)).toEqual(2);
        });

        test("returns default value for page number if state is empty", () => {
            expect(getArticlesPageNumber({} as IStoreState)).toEqual(1);
        });
    });

    describe("getArticlesLimit", () => {
        test("returns Limit from state", () => {
            expect(getArticlesPageLimit(state as IStoreState)).toEqual(2);
        });

        test("returns default value for page Limit if state is empty", () => {
            expect(getArticlesPageLimit({} as IStoreState)).toEqual(9);
        });
    });

    describe("getArticlesHasMore", () => {
        test("returns hasMore from state", () => {
            expect(getArticlesHasMore(state as IStoreState)).toBeTruthy();
        });

        test("returns default value for hasMore if state is empty", () => {
            expect(getArticlesHasMore({} as IStoreState)).toBeFalsy();
        });
    });

    describe("getArticlesInitialized", () => {
        test("returns initialized from state", () => {
            expect(getArticlesInitialized(state as IStoreState)).toBeTruthy();
        });

        test("returns default value for initialized if state is empty", () => {
            expect(getArticlesInitialized({} as IStoreState)).toBeFalsy();
        });
    });
});
