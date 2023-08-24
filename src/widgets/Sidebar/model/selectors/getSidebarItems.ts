import { createSelector } from "@reduxjs/toolkit";
import { lazy, SVGProps, ComponentType } from "react";
import { getUserAuthData } from "@/entities/User";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";
import { ISidebarItem } from "../types/ISidebarItem";
import { toggleFeatures } from "@/shared/lib/features";

const AboutPageIconDeprecated = lazy(() => import("@/shared/assets/icons/about-page.svg"));
const MainPageIconDeprecated = lazy(() => import("@/shared/assets/icons/main-page.svg"));
const ProfilePageIconDeprecated = lazy(() => import("@/shared/assets/icons/profile-page.svg"));
const ArticlesPageIconDeprecated = lazy(() => import("@/shared/assets/icons/article.svg"));

const MainPageIcon = lazy(() => import("@/shared/assets/icons/home-redesigned.svg"));
const AboutPageIcon = lazy(() => import("@/shared/assets/icons/info-redesigned.svg"));
const ProfilePageIcon = lazy(() => import("@/shared/assets/icons/profile-redesigned.svg"));
const ArticlesPageIcon = lazy(() => import("@/shared/assets/icons/article-redesigned.svg"));

type GenericIconType = ComponentType<Omit<SVGProps<SVGSVGElement>, "ref">>;

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: ISidebarItem[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures<GenericIconType>({
                name: "isAppRedesigned",
                off: () => MainPageIconDeprecated,
                on: () => MainPageIcon
            }),
            text: "Main"
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures<GenericIconType>({
                name: "isAppRedesigned",
                off: () => AboutPageIconDeprecated,
                on: () => AboutPageIcon
            }),
            text: "About"
        }
    ];

    if (userData?.id) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(`${userData?.id}`),
                Icon: toggleFeatures<GenericIconType>({
                    name: "isAppRedesigned",
                    off: () => ProfilePageIconDeprecated,
                    on: () => ProfilePageIcon
                }),
                text: "Profile",
                isPrivate: true
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures<GenericIconType>({
                    name: "isAppRedesigned",
                    off: () => ArticlesPageIconDeprecated,
                    on: () => ArticlesPageIcon
                }),
                text: "Articles",
                isPrivate: true
            }
        );
    }

    return sidebarItemsList;
});
