import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "shared/config/routeConfig/routeConfig";
import { Loader } from "shared/ui/Loader/Loader";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <div className="page-wrapper">{route.element}</div>;

        return (
            <Route
                element={route.isPrivate ? <RequireAuth>{element}</RequireAuth> : element}
                key={route.path}
                path={route.path}
            />
        );
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </Suspense>
    );
});
