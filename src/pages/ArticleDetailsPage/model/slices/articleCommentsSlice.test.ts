import { IComment } from "entities/Comment";
import { retrieveCommentsByArticleId } from "../services/retrieveCommentsByArticleId/retrieveCommentsByArticleId";
import { IArticleCommentsState } from "../types/IArticleCommentsState";
import { articleCommentsReducer } from "./articleCommentsSlice";

describe("articleCommentsSlice", () => {
    test("retrieveCommentByArticleId pending", () => {
        const state: IArticleCommentsState = {
            entities: {},
            ids: [],
            error: "",
            isLoading: false
        };
        const newState = articleCommentsReducer(state, retrieveCommentsByArticleId.pending);
        expect(newState).toStrictEqual<IArticleCommentsState>({
            entities: {},
            ids: [],
            error: undefined,
            isLoading: true
        });
    });

    test("retrieveCommentByArticleId fulfilled", () => {
        const state: IArticleCommentsState = {
            entities: {},
            ids: [],
            error: "",
            isLoading: false
        };

        const comments: IComment[] = [
            {
                id: 1,
                text: "Text",
                user: {
                    id: 1,
                    username: "User"
                }
            },
            {
                id: 2,
                text: "Text  2",
                user: {
                    id: 1,
                    username: "User"
                }
            }
        ];
        const newState = articleCommentsReducer(state, {
            type: retrieveCommentsByArticleId.fulfilled,
            payload: comments
        });
        expect(newState).toStrictEqual<IArticleCommentsState>({
            entities: {
                1: {
                    id: 1,
                    text: "Text",
                    user: {
                        id: 1,
                        username: "User"
                    }
                },
                2: {
                    id: 2,
                    text: "Text  2",
                    user: {
                        id: 1,
                        username: "User"
                    }
                }
            },
            ids: [1, 2],
            error: "",
            isLoading: false
        });
    });

    test("retrieveCommentByArticleId rejected", () => {
        const state: IArticleCommentsState = {
            entities: {},
            ids: [],
            isLoading: true
        };
        const newState = articleCommentsReducer(state, {
            type: retrieveCommentsByArticleId.rejected,
            payload: "Error"
        });
        expect(newState).toStrictEqual<IArticleCommentsState>({
            entities: {},
            ids: [],
            error: "Error",
            isLoading: false
        });
    });
});
