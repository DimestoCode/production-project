import { getUserAuthData } from "entities/User";
import { memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { Loader } from "widgets/Loader/ui/Loader";

export const AppRouter = memo(() => {
    const isAuthenticated = useSelector(getUserAuthData);

    const routes = useMemo(
        () => Object.values(routeConfig).filter(({ isPrivate }) => !!isAuthenticated || !isPrivate),
        [isAuthenticated]
    );
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route element={<div className="page-wrapper">{element}</div>} key={path} path={path} />
                ))}
            </Routes>
        </Suspense>
    );
});
