import { AboutPage } from "pages/AboutPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
    isPrivate?: boolean;
};

export enum AppRoutes {
    Main = "main",
    About = "about",
    Profile = "profile",
    Articles = "articles",
    ArticleDetails = "article_details",
    NotFound = "not-found"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: "/",
    [AppRoutes.About]: "/about",
    [AppRoutes.Profile]: "/profile",
    [AppRoutes.Articles]: "/articles",
    [AppRoutes.ArticleDetails]: "/articles", // + id
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
    [AppRoutes.Articles]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        isPrivate: true
    },
    [AppRoutes.ArticleDetails]: {
        path: `${RoutePath.article_details}/:articleId`,
        element: <ArticleDetailsPage />,
        isPrivate: true
    },
    [AppRoutes.NotFound]: {
        path: RoutePath["not-found"],
        element: <NotFoundPage />
    }
};
