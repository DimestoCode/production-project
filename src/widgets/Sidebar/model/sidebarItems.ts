import { RoutePath } from "@/shared/const/router";
import MainPageIcon from "@/shared/assets/icons/main-page.svg";
import AboutPageIcon from "@/shared/assets/icons/about-page.svg";
import ProfilePageIcon from "@/shared/assets/icons/profile-page.svg";
import ArticlePageIcon from "@/shared/assets/icons/article.svg";
import { ISidebarItem } from "./types/ISidebarItem";

export const sidebarItemsList: ISidebarItem[] = [
    {
        path: RoutePath.main,
        Icon: MainPageIcon,
        text: "Main"
    },
    {
        path: RoutePath.about,
        Icon: AboutPageIcon,
        text: "About"
    },
    {
        path: RoutePath.profile,
        Icon: ProfilePageIcon,
        text: "Profile",
        isPrivate: true
    },
    {
        path: RoutePath.articles,
        Icon: ArticlePageIcon,
        text: "Articles",
        isPrivate: true
    }
];
