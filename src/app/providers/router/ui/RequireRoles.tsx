import { Navigate, useLocation } from "react-router-dom";
import { UserRole, useUserRoles } from "@/entities/User";
import { getRouteForbidden } from "@/shared/const/router";

interface IRequireRolesProps {
    routeRoles?: UserRole[];
    children: JSX.Element;
}

export const RequireRoles = ({ routeRoles, children }: IRequireRolesProps) => {
    const userRoles = useUserRoles();
    const location = useLocation();
    const hasRequiredRoles = routeRoles?.some((role) => userRoles?.includes(role));

    if (routeRoles && !hasRequiredRoles) {
        return <Navigate state={{ from: location }} to={getRouteForbidden()} replace />;
    }

    return children;
};
