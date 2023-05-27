import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import i18n from "@/shared/config/i18n/i18n";
import { IArticle } from "../../types/IArticle";

export const retrieveArticleById = createAsyncThunk<IArticle, number, IThunkConfig<string>>(
    "articleDetails/retrieveArticleData",
    async (articleId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<IArticle>(`/articles/${articleId}`, {
                params: {
                    _expand: "user"
                }
            });

            if (!response.data) {
                throw new Error();
            }
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
