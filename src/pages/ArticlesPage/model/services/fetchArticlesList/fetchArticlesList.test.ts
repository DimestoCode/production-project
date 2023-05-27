import { ArticleSortField, ArticleType, IArticle } from "@/entities/Article";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import { IArticlesState } from "../../types/IArticlesState";
import { fetchArticlesList } from "./fetchArticlesList";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("fetchArticlesList", () => {
    test("should fulfill with all query params if type is all", async () => {
        const articlesState: DeepPartial<IArticlesState> = {
            page: 1,
            limit: 3,
            sort: ArticleSortField.Title,
            hasMore: true,
            order: "desc",
            type: ArticleType.All,
            initialized: true,
            search: "Search"
        };
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articles: articlesState
        });
        const data: DeepPartial<IArticle>[] = [{ id: 1, blocks: [], createdAt: "08/08" }];
        thunk.api.get.mockResolvedValue({ data });

        const res = await thunk.callThunk({ initialLoad: true });

        expect(res.meta.requestStatus).toBe("fulfilled");
        expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
            params: {
                _expand: "user",
                _limit: articlesState.limit,
                _page: articlesState.page,
                _sort: articlesState.sort,
                _order: articlesState.order,
                type: undefined,
                q: articlesState.search
            }
        });

        expect(res.payload).toStrictEqual({
            articles: data,
            initialLoad: true
        });
    });

    test("should fulfill with all query params if type is economics", async () => {
        const articlesState: DeepPartial<IArticlesState> = {
            type: ArticleType.Economics
        };
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articles: articlesState
        });
        const data: DeepPartial<IArticle>[] = [{ id: 1, blocks: [], createdAt: "08/08" }];
        thunk.api.get.mockResolvedValue({ data });

        const res = await thunk.callThunk({ initialLoad: true });

        expect(res.meta.requestStatus).toBe("fulfilled");
        expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
            params: expect.objectContaining({
                type: articlesState.type
            })
        });
    });

    test("should reject", async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articles: {
                limit: 3
            }
        });
        thunk.api.get.mockResolvedValue({ data: null });

        const res = await thunk.callThunk({ initialLoad: true });

        expect(res.meta.requestStatus).toBe("rejected");
        expect(thunk.api.get).toHaveBeenCalled();
        expect(res.payload).toBe("Server Error");
    });
});
