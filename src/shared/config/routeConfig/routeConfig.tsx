import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

type AppRoutesProps = RouteProps & {
    isPrivate?: boolean;
};
export enum AppRoutes {
    Main = "main",
    About = "about",
    Profile = "profile",
    NotFound = "not-found"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: "/",
    [AppRoutes.About]: "/about",
    [AppRoutes.Profile]: "/profile",
    [AppRoutes.NotFound]: "*"
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Main]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.About]: {
        path: RoutePath.about,
        element: <AboutPage />
    },
    [AppRoutes.Profile]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        isPrivate: true
    },
    [AppRoutes.NotFound]: {
        path: RoutePath["not-found"],
        element: <NotFoundPage />
    }
};
