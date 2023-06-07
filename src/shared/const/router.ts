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
