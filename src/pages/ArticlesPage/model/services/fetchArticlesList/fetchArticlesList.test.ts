import { IArticle } from "entities/Article";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk";
import { articlesActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "./fetchArticlesList";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("fetchArticlesList", () => {
    test("should fulfill", async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articles: {
                limit: 3
            }
        });
        const data: DeepPartial<IArticle>[] = [{ id: 1, blocks: [], createdAt: "08/08" }];
        thunk.api.get.mockResolvedValue({ data });

        const res = await thunk.callThunk({ page: 1, initialLoad: true });

        expect(res.meta.requestStatus).toBe("fulfilled");
        expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
            params: {
                _page: 1,
                _limit: 3,
                _expand: "user"
            }
        });
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesActions.setArticles({ articles: data as IArticle[], initialLoad: true })
        );
        expect(res.payload).toStrictEqual(data);
    });

    test("should reject", async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articles: {
                limit: 3
            }
        });
        thunk.api.get.mockResolvedValue({ data: null });

        const res = await thunk.callThunk({ page: 1 });

        expect(res.meta.requestStatus).toBe("rejected");
        expect(thunk.api.get).toHaveBeenCalledWith("/articles", {
            params: {
                _expand: "user",
                _page: 1,
                _limit: 3
            }
        });
        expect(res.payload).toBe("Server Error");
    });
});
