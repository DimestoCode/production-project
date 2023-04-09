import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { getArticleDetailsData } from "entities/Article";
import { IComment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import i18n from "shared/config/i18n/i18n";
import { retrieveCommentsByArticleId } from "../retrieveCommentsByArticleId/retrieveCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<IComment, string, IThunkConfig<string>>(
    "articleDetails/addComment",
    async (comment, { dispatch, extra, rejectWithValue, getState }) => {
        try {
            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !comment || !article) {
                return rejectWithValue(
                    i18n.t("Invalid data", {
                        ns: "common"
                    })
                );
            }
            const response = await extra.api.post<IComment>("/comments", {
                articleId: article.id,
                userId: userData.id,
                text: comment
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(retrieveCommentsByArticleId(article.id));
            return response.data;
        } catch (e) {
            return rejectWithValue(
                i18n.t("Server Error", {
                    ns: "common"
                })
            );
        }
    }
);
