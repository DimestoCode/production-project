import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { Loader } from "widgets/Loader/ui/Loader";

export const AppRouter = () => (
    <Suspense fallback={<Loader />}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route path={path} key={path} element={<div className="page-wrapper">{element}</div>} />
            ))}
        </Routes>
    </Suspense>
);
