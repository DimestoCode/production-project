import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainPageIcon from "shared/assets/icons/main-page.svg";
import AboutPageIcon from "shared/assets/icons/about-page.svg";
import { lazy } from "react";
import { ISidebarItem } from "../types/ISidebarItem";

const ProfilePageIcon = lazy(() => import("shared/assets/icons/profile-page.svg"));
const ArticlesPageIcon = lazy(() => import("shared/assets/icons/article.svg"));

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: ISidebarItem[] = [
        {
            path: RoutePath.main,
            Icon: MainPageIcon,
            text: "Main"
        },
        {
            path: RoutePath.about,
            Icon: AboutPageIcon,
            text: "About"
        }
    ];

    if (userData?.id) {
        sidebarItemsList.push(
            {
                path: `${RoutePath.profile}/${userData?.id}`,
                Icon: ProfilePageIcon,
                text: "Profile",
                isPrivate: true
            },
            {
                path: RoutePath.articles,
                Icon: ArticlesPageIcon,
                text: "Articles",
                isPrivate: true
            }
        );
    }

    return sidebarItemsList;
});
