import { FC, lazy } from "react";

export const ArticlesPageAsync = lazy<FC>(
    () =>
        new Promise((res) => {
            setTimeout(() => res(import("./ArticlesPage")), 1000);
        })
);
