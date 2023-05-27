import { IComment } from "@/entities/Comment";
import { UserRole } from "@/entities/User";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk";
import { retrieveCommentsByArticleId } from "./retrieveCommentsByArticleId";

jest.mock("axios");
jest.mock("shared/config/i18n/i18n", () => jest.requireActual("shared/config/i18n/i18nForTests"));

describe("retrieveCommentsByArticleId.test", () => {
    test("fullfilled", async () => {
        const thunk = new TestAsyncThunk(retrieveCommentsByArticleId);
        const comments: IComment[] = [
            {
                id: 1,
                text: "Comment",
                user: {
                    id: 1,
                    username: "user",
                    roles: [UserRole.Admin]
                }
            }
        ];
        thunk.api.get.mockResolvedValue({ data: comments });

        const res = await thunk.callThunk(1);

        expect(res.meta.requestStatus).toBe("fulfilled");
        expect(thunk.api.get).toHaveBeenCalledWith("/comments", {
            params: {
                articleId: 1,
                _expand: "user"
            }
        });
        expect(res.payload).toStrictEqual(comments);
    });

    test("rejected with wrong artcleId value", async () => {
        const thunk = new TestAsyncThunk(retrieveCommentsByArticleId);
        const comments: IComment[] = [
            {
                id: 1,
                text: "Comment",
                user: {
                    id: 1,
                    username: "user",
                    roles: [UserRole.Admin]
                }
            }
        ];
        thunk.api.get.mockResolvedValue({ data: comments });

        const res = await thunk.callThunk(undefined);

        expect(res.meta.requestStatus).toBe("rejected");
        expect(thunk.api.get).not.toHaveBeenCalled();
        expect(res.payload).toStrictEqual("Wrong article id");
    });

    test("rejected with server error", async () => {
        const thunk = new TestAsyncThunk(retrieveCommentsByArticleId);
        thunk.api.get.mockResolvedValue({ data: null });

        const res = await thunk.callThunk(1);

        expect(res.meta.requestStatus).toBe("rejected");
        expect(thunk.api.get).toHaveBeenCalledWith("/comments", {
            params: {
                articleId: 1,
                _expand: "user"
            }
        });
        expect(res.payload).toStrictEqual("Server Error");
    });
});
