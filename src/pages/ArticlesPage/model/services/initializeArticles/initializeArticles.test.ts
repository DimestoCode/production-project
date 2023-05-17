import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { initializeArticles } from "./initializeArticles";

jest.mock("../../slices/articlesPageSlice");
jest.mock("../fetchArticlesList/fetchArticlesList");

describe("initializeArticles", () => {
    test("should trigger other actions if initialized = false and ser", async () => {
        const thunk = new TestAsyncThunk(initializeArticles, {
            articles: {
                initialized: false
            }
        });

        await thunk.callThunk(new URLSearchParams(""));

        expect(articlesActions.initializeState).toHaveBeenCalled();
        expect(fetchArticlesList).toHaveBeenCalledWith({ initialLoad: true });
    });

    test("should not trigger other actions if initialized = true", async () => {
        const thunk = new TestAsyncThunk(initializeArticles, {
            articles: {
                initialized: true
            }
        });

        await thunk.callThunk(new URLSearchParams());

        expect(articlesActions.initializeState).not.toHaveBeenCalled();
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test("should trigger action for each query param that was passed", async () => {
        const thunk = new TestAsyncThunk(initializeArticles, {
            articles: {
                initialized: false
            }
        });
        const params = { order: "asc", sort: "title", search: "Search", type: "All" };
        await thunk.callThunk(new URLSearchParams(params));

        expect(articlesActions.setOrder).toHaveBeenCalledWith(params.order);
        expect(articlesActions.setSort).toHaveBeenCalledWith(params.sort);
        expect(articlesActions.setSearch).toHaveBeenCalledWith(params.search);
        expect(articlesActions.setType).toHaveBeenCalledWith(params.type);
    });
});
