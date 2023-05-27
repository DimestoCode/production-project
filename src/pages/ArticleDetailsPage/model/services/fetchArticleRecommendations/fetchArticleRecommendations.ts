import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConfig } from "@/app/providers/StoreProvider";
import { IArticle } from "@/entities/Article";
import i18n from "@/shared/config/i18n/i18n";

export const fetchArticleRecommendations = createAsyncThunk<IArticle[], void, IThunkConfig<string>>(
    "articleDetailsRecommendations/fetchArticleRecommendations",
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<IArticle[]>("/articles", {
                params: {
                    _expand: "user",
                    _limit: 4
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
