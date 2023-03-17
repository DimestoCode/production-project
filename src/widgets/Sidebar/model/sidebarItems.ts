import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainPageIcon from "shared/assets/icons/main-page.svg";
import AboutPageIcon from "shared/assets/icons/about-page.svg";
import ProfilePageIcon from "shared/assets/icons/profile-page.svg";
import { ISidebarItem } from "./types/ISidebarItem";

export const sidebarItemsList: ISidebarItem[] = [
    {
        path: RoutePath.main,
        Icon: MainPageIcon,
        text: "Main page"
    },
    {
        path: RoutePath.about,
        Icon: AboutPageIcon,
        text: "About page"
    },
    {
        path: RoutePath.profile,
        Icon: ProfilePageIcon,
        text: "Profile page"
    }
];
