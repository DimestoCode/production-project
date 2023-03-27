import { FC, lazy } from "react";

export const ArticleDetailsPageAsync = lazy<FC>(
    () =>
        new Promise((res) => {
            setTimeout(() => res(import("./ArticleDetailsPage")), 1000);
        })
);
