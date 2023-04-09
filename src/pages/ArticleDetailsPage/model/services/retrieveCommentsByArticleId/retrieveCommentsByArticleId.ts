import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "app/providers/StoreProvider";
import { IComment } from "entities/Comment";
import i18n from "shared/config/i18n/i18n";

export const retrieveCommentsByArticleId = createAsyncThunk<IComment[], number | undefined, IThunkConfig<string>>(
    "articleCommenst/retrieveCommentsByArticleId",
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        if (!articleId) {
            return rejectWithValue(
                i18n.t("Wrong article id", {
                    ns: "common"
                })
            );
        }
        try {
            const response = await extra.api.get<IComment[]>("/comments", {
                params: {
                    articleId,
                    _expand: "user"
                }
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                i18n.t("Server Error", {
                    ns: "common"
                })
            );
        }
    }
);
