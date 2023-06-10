import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserAuthData } from "@/entities/User";
import { getRouteMain } from "@/shared/const/router";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return <Navigate state={{ from: location }} to={getRouteMain()} replace />;
    }

    return children;
};
