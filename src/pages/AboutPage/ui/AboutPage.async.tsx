import { FC, lazy } from "react";

export const AboutPageAsync = lazy<FC>(
    () =>
        new Promise((res) => {
            setTimeout(() => res(import("./AboutPage")), 1000);
        })
);
