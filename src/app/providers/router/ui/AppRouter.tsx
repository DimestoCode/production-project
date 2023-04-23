import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "shared/config/routeConfig/routeConfig";
import { Loader } from "shared/ui/Loader/Loader";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

        return (
            <Route
                element={route.isPrivate ? <RequireAuth>{element}</RequireAuth> : element}
                key={route.path}
                path={route.path}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
