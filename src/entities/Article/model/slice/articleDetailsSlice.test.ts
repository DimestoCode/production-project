import { retrieveArticleById } from "../services/retrieveArticleById/retrieveArticleById";
import { ArticleType } from "../types/IArticle";
import { IArticleState } from "../types/IArticleState";
import { articleDetailsReducer } from "./articleDetailsSlice";

describe("articleDetailsSlice", () => {
    test("retrieveArticleById pending", () => {
        const state: DeepPartial<IArticleState> = {
            data: {
                id: 1
            },
            error: "string",
            isLoading: false
        };

        const result = articleDetailsReducer(state as IArticleState, retrieveArticleById.pending);
        expect(result).toStrictEqual<DeepPartial<IArticleState>>({
            isLoading: true,
            error: undefined,
            data: {
                id: 1
            }
        });
    });

    test("retrieveArticleById fulfilled", () => {
        const state: DeepPartial<IArticleState> = {
            data: {
                id: 1
            },
            isLoading: true
        };

        const result = articleDetailsReducer(state as IArticleState, {
            type: retrieveArticleById.fulfilled,
            payload: {
                id: 1,
                blocks: [],
                createdAt: "08/08/08",
                img: "img",
                subtitle: "sub",
                title: "title",
                type: [ArticleType.Economics],
                views: 100
            }
        });
        expect(result).toStrictEqual<DeepPartial<IArticleState>>({
            isLoading: false,
            data: {
                id: 1,
                blocks: [],
                createdAt: "08/08/08",
                img: "img",
                subtitle: "sub",
                title: "title",
                type: [ArticleType.Economics],
                views: 100
            }
        });
    });

    test("retrieveArticleById rejected", () => {
        const state: DeepPartial<IArticleState> = {
            isLoading: true
        };

        const result = articleDetailsReducer(state as IArticleState, {
            type: retrieveArticleById.rejected,
            payload: "Error"
        });
        expect(result).toStrictEqual<DeepPartial<IArticleState>>({
            isLoading: false,
            error: "Error"
        });
    });
});
