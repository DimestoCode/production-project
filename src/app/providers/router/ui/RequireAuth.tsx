import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import { useUserAuthData } from "@/entities/User";
import { getRouteMain } from "@/shared/const/router";

export const RequireAuth = ({ children }: { children: ReactElement }) => {
    const auth = useUserAuthData();
    const location = useLocation();

    if (!auth) {
        return <Navigate state={{ from: location }} to={getRouteMain()} replace />;
    }

    return children;
};
