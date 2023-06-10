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

export const getRouteMain = () => "/";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => "/articles";
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleAdd = () => `${getRouteArticles()}/add`;
export const getRouteArticleEdit = (id: string) => `${getRouteArticles()}/${id}/edit`;
export const getRouteAdmin = () => "/admin";
export const getRouteForbidden = () => "/forbidden";
