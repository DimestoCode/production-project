import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk";
import { ArticleType, IArticle } from "../../types/IArticle";
import { retrieveArticleById } from "./retrieveArticleById";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("retrieveArticleById", () => {
    test("should be fulfilled", async () => {
        const thunk = new TestAsyncThunk(retrieveArticleById);

        const data: DeepPartial<IArticle> = {
            id: 1,
            blocks: [{ id: 2, src: "src" }],
            createdAt: "08/08/11",
            img: "img",
            subtitle: "subtitle",
            title: "title",
            type: [ArticleType.Economics],
            views: 100
        };
        thunk.api.get.mockResolvedValue({ data });

        const result = await thunk.callThunk(1);

        expect(thunk.api.get).toHaveBeenCalledWith("/articles/1", { params: { _expand: "user" } });
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toStrictEqual(data);
    });

    test("should be rejected ", async () => {
        const thunk = new TestAsyncThunk(retrieveArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk(1);
        expect(thunk.api.get).toHaveBeenCalledWith("/articles/1", { params: { _expand: "user" } });
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toBe("Server Error");
    });
});
