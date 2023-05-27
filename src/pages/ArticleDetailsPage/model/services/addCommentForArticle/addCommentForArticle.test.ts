import { IStoreState } from "@/app/providers/StoreProvider";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import { retrieveCommentsByArticleId } from "../retrieveCommentsByArticleId/retrieveCommentsByArticleId";
import { addCommentForArticle } from "./addCommentForArticle";

jest.mock("axios");
jest.mock("../retrieveCommentsByArticleId/retrieveCommentsByArticleId", () => {
    return {
        retrieveCommentsByArticleId: jest.fn()
    };
});
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("addCommentForArticle", () => {
    it("fullfilled", async () => {
        const state: DeepPartial<IStoreState> = {
            user: {
                authData: {
                    id: 1
                }
            },
            articleDetails: {
                data: {
                    id: 2
                }
            }
        };
        const thunk = new TestAsyncThunk(addCommentForArticle, state as IStoreState);
        thunk.api.post.mockResolvedValue({ data: "Comment" });
        const result = await thunk.callThunk("Comment");

        expect(thunk.api.post).toHaveBeenCalledWith("/comments", {
            articleId: 2,
            userId: 1,
            text: "Comment"
        });
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toBe("Comment");
        expect(retrieveCommentsByArticleId).toHaveBeenCalledWith(2);
    });

    it("rejected with invalid data error", async () => {
        const state: DeepPartial<IStoreState> = {
            articleDetails: {
                data: {
                    id: 2
                }
            }
        };
        const thunk = new TestAsyncThunk(addCommentForArticle, state as IStoreState);
        thunk.api.post.mockResolvedValue({ data: "Comment" });

        const result = await thunk.callThunk("Comment");

        expect(result.payload).toBe("Invalid data");
        expect(result.meta.requestStatus).toBe("rejected");
        expect(thunk.api.post).not.toHaveBeenCalled();
    });

    it("rejected with server error", async () => {
        const state: DeepPartial<IStoreState> = {
            user: {
                authData: {
                    id: 1
                }
            },
            articleDetails: {
                data: {
                    id: 2
                }
            }
        };
        const thunk = new TestAsyncThunk(addCommentForArticle, state as IStoreState);
        thunk.api.post.mockResolvedValue({ data: null });

        const result = await thunk.callThunk("Comment");

        expect(result.payload).toBe("Server Error");
        expect(result.meta.requestStatus).toBe("rejected");
        expect(thunk.api.post).toHaveBeenCalledWith("/comments", {
            articleId: 2,
            userId: 1,
            text: "Comment"
        });
        expect(retrieveCommentsByArticleId).not.toHaveBeenCalled();
    });
});
