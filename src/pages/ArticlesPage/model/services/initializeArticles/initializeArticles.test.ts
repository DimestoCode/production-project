import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { initializeArticles } from "./initializeArticles";

jest.mock("../../slices/articlesPageSlice");
jest.mock("../fetchArticlesList/fetchArticlesList");

describe("initializeArticles", () => {
    test("should trigger other actions if initialized = false", async () => {
        const thunk = new TestAsyncThunk(initializeArticles, {
            articles: {
                initialized: false
            }
        });

        await thunk.callThunk();

        expect(articlesActions.initializeState).toHaveBeenCalled();
        expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1, initialLoad: true });
    });

    test("should not trigger other actions if initialized = true", async () => {
        const thunk = new TestAsyncThunk(initializeArticles, {
            articles: {
                initialized: true
            }
        });

        await thunk.callThunk();

        expect(articlesActions.initializeState).not.toHaveBeenCalled();
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
