import { createSelector } from "@reduxjs/toolkit";
import { lazy } from "react";
import { getUserAuthData } from "@/entities/User";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";
import MainPageIcon from "@/shared/assets/icons/main-page.svg";
import AboutPageIcon from "@/shared/assets/icons/about-page.svg";
import { ISidebarItem } from "../types/ISidebarItem";

const ProfilePageIcon = lazy(() => import("@/shared/assets/icons/profile-page.svg"));
const ArticlesPageIcon = lazy(() => import("@/shared/assets/icons/article.svg"));

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: ISidebarItem[] = [
        {
            path: getRouteMain(),
            Icon: MainPageIcon,
            text: "Main"
        },
        {
            path: getRouteAbout(),
            Icon: AboutPageIcon,
            text: "About"
        }
    ];

    if (userData?.id) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(`${userData?.id}`),
                Icon: ProfilePageIcon,
                text: "Profile",
                isPrivate: true
            },
            {
                path: getRouteArticles(),
                Icon: ArticlesPageIcon,
                text: "Articles",
                isPrivate: true
            }
        );
    }

    return sidebarItemsList;
});
