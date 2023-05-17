import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { fetchFollowingArticles } from "./fetchFollowingArticles";

jest.mock("../fetchArticlesList/fetchArticlesList");
jest.mock("../../slices/articlesPageSlice");

afterEach(() => {
    jest.resetAllMocks();
});
describe("fetchFollowingArticles", () => {
    test("should be fulfilled", async () => {
        const thunk = new TestAsyncThunk(fetchFollowingArticles, {
            articles: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true
            }
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(articlesActions.setPage).toHaveBeenCalledWith(3);
        expect(fetchArticlesList).toHaveBeenCalledWith({ initialLoad: false });
    });

    test("should not trigger fetchArticlesList if hasMore = false", async () => {
        const thunk = new TestAsyncThunk(fetchFollowingArticles, {
            articles: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false
            }
        });

        await thunk.callThunk();

        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test("should not trigger fetchArticlesList if isLoading = true", async () => {
        const thunk = new TestAsyncThunk(fetchFollowingArticles, {
            articles: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true
            }
        });

        await thunk.callThunk();

        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
