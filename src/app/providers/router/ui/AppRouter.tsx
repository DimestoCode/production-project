import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { Loader } from "@/shared/ui/Loader/Loader";
import { RequireAuth } from "./RequireAuth";
import { RequireRoles } from "./RequireRoles";

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

        const privateElement = (
            <RequireAuth>
                <RequireRoles routeRoles={route.roles}>{element}</RequireRoles>
            </RequireAuth>
        );

        return <Route element={route.isPrivate ? privateElement : element} key={route.path} path={route.path} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
