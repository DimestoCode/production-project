import { UserRole } from "entities/User";
import { AboutPage } from "pages/AboutPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { EditArticlePage } from "pages/EditArticlePage";
import { ForbiddentPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
    isPrivate?: boolean;
    roles?: UserRole[];
};

export enum AppRoutes {
    Main = "main",
    About = "about",
    Profile = "profile",
    Articles = "articles",
    ArticleDetails = "article_details",
    AddArticle = "add_article",
    EditArticle = "edit_article",
    AdminPanel = "admin_panel",
    Forbidden = "forbidden",
    NotFound = "not-found"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: "/",
    [AppRoutes.About]: "/about",
    [AppRoutes.Profile]: "/profile",
    [AppRoutes.Articles]: "/articles",
    [AppRoutes.ArticleDetails]: "/articles", // + id
    [AppRoutes.AddArticle]: "/articles/add",
    [AppRoutes.EditArticle]: "/articles/:articleId/edit",
    [AppRoutes.AdminPanel]: "/admin",
    [AppRoutes.Forbidden]: "/forbidden",
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
        path: `${RoutePath.profile}/:profileId`,
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
    [AppRoutes.EditArticle]: {
        path: `${RoutePath.edit_article}`,
        element: <EditArticlePage />,
        isPrivate: true
    },
    [AppRoutes.AddArticle]: {
        path: `${RoutePath.add_article}`,
        element: <EditArticlePage />,
        isPrivate: true
    },
    [AppRoutes.AdminPanel]: {
        path: `${RoutePath.admin_panel}`,
        element: <AdminPanelPage />,
        isPrivate: true,
        roles: [UserRole.Admin, UserRole.Manager]
    },
    [AppRoutes.Forbidden]: {
        path: RoutePath.forbidden,
        element: <ForbiddentPage />
    },
    [AppRoutes.NotFound]: {
        path: RoutePath["not-found"],
        element: <NotFoundPage />
    }
};
