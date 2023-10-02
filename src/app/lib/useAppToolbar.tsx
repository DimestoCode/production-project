import { ReactElement } from "react";
import { AppRoutes } from "@/shared/const/router";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { useRouteChange } from "@/shared/lib/router/useRouteChange";

export const useAppToolbar = () => {
    const currentRoute = useRouteChange();

    const toolbarByAppRoute: Partial<Record<AppRoutes, ReactElement>> = {
        [AppRoutes.Articles]: <ScrollToolbar />,
        [AppRoutes.ArticleDetails]: <ScrollToolbar />
    };

    return toolbarByAppRoute[currentRoute];
};
