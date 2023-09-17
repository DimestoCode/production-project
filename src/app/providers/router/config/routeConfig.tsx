import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { EditArticlePage } from "@/pages/EditArticlePage";
import { ForbiddentPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleAdd,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteSettings
} from "@/shared/const/router";
import { AppRoutesProps } from "../types/AppRoutesPropsType";
import { SettingsPage } from "@/pages/SettingsPage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Main]: {
        path: getRouteMain(),
        element: <MainPage />
    },
    [AppRoutes.Settings]: {
        path: getRouteSettings(),
        element: <SettingsPage />
    },
    [AppRoutes.About]: {
        path: getRouteAbout(),
        element: <AboutPage />
    },
    [AppRoutes.Profile]: {
        path: getRouteProfile(":profileId"),
        element: <ProfilePage />,
        isPrivate: true
    },
    [AppRoutes.Articles]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        isPrivate: true
    },
    [AppRoutes.ArticleDetails]: {
        path: getRouteArticleDetails(":articleId"),
        element: <ArticleDetailsPage />,
        isPrivate: true
    },
    [AppRoutes.EditArticle]: {
        path: getRouteArticleEdit(":articleId"),
        element: <EditArticlePage />,
        isPrivate: true
    },
    [AppRoutes.AddArticle]: {
        path: getRouteArticleAdd(),
        element: <EditArticlePage />,
        isPrivate: true
    },
    [AppRoutes.AdminPanel]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        isPrivate: true,
        roles: [UserRole.Admin, UserRole.Manager]
    },
    [AppRoutes.Forbidden]: {
        path: getRouteForbidden(),
        element: <ForbiddentPage />
    },
    [AppRoutes.NotFound]: {
        path: "*",
        element: <NotFoundPage />
    }
};
