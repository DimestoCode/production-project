import { IArticle } from "entities/Article";
import { ArticleType } from "entities/Article/model/types/IArticle";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { IArticlesState } from "../types/IArticlesState";
import { articlesActions, articlesReducer } from "./articlesPageSlice";

describe("articlesPageSlice", () => {
    test("setView", () => {
        const state: DeepPartial<IArticlesState> = {
            view: "grid",
            page: 2,
            limit: 9
        };
        const res = articlesReducer(state as IArticlesState, articlesActions.setView("list"));

        expect(res).toStrictEqual({
            view: "list",
            limit: 4,
            page: 1
        });
    });

    test("setPage", () => {
        const state: DeepPartial<IArticlesState> = {
            page: 1
        };
        const res = articlesReducer(state as IArticlesState, articlesActions.setPage(2));

        expect(res.page).toBe(2);
    });

    test("fetchArticlesList pending", () => {
        const state: DeepPartial<IArticlesState> = {};

        const res = articlesReducer(state as IArticlesState, fetchArticlesList.pending);

        expect(res.isLoading).toBeTruthy();
        expect(res.error).toBeUndefined();
    });

    test("fetchArticlesList fulfilled", () => {
        jest.spyOn(articlesActions, "setArticles");
        const state: DeepPartial<IArticlesState> = {};
        const articles: DeepPartial<IArticle>[] = [{ id: 1, type: [ArticleType.Economics], createdAt: "08/08/200" }];
        const res = articlesReducer(state as IArticlesState, {
            type: fetchArticlesList.fulfilled,
            payload: articles as IArticle[]
        });

        expect(res.isLoading).toBeFalsy();
    });

    test("fetchArticlesList rejected", () => {
        const state: DeepPartial<IArticlesState> = {};
        const res = articlesReducer(state as IArticlesState, {
            type: fetchArticlesList.rejected,
            payload: "Error"
        });

        expect(res.isLoading).toBeFalsy();
        expect(res.error).toBe("Error");
    });

    test("initializeState", () => {
        const state: DeepPartial<IArticlesState> = { initialized: false };

        const newState = articlesReducer(state as IArticlesState, articlesActions.initializeState());

        expect(newState).toStrictEqual({ initialized: true });
    });

    describe("setArticles", () => {
        test("should set initial articles", () => {
            const state: DeepPartial<IArticlesState> = {
                entities: {},
                ids: [],
                hasMore: false
            };

            const res = articlesReducer(
                state as IArticlesState,
                articlesActions.setArticles({ articles: [{ id: 1 }, { id: 2 }] as IArticle[], initialLoad: true })
            );

            expect(res).toStrictEqual({
                entities: {
                    "1": { id: 1 },
                    "2": { id: 2 }
                },
                ids: [1, 2],
                hasMore: true
            });
        });
    });
});