import { memo, ReactElement, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { RequireRoles } from "./RequireRoles";
import { AppRoutesProps } from "../types/AppRoutesPropsType";
import { routeConfig } from "../config/routeConfig";

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const privateElement = (
            <RequireAuth>
                <RequireRoles routeRoles={route.roles}>{route.element as ReactElement}</RequireRoles>
            </RequireAuth>
        );

        return <Route element={route.isPrivate ? privateElement : route.element} key={route.path} path={route.path} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
