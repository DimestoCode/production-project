import { FC, lazy } from "react";

export const ProfilePageAsync = lazy<FC>(
    () =>
        new Promise((res) => {
            setTimeout(() => res(import("./ProfilePage")), 1000);
        })
);
